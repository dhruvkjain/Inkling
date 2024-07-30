const { v4: uuidv4 } = require('uuid');
let generaterandomwords;
(async () => {
    const { generate } = await import('random-words');
    generaterandomwords = generate;
})();

const games = require('../models/game.model.js');
const users = require('../models/user.model.js');

async function createRoom(socketId, username, profilePic) {
    try {
        if (!username || !profilePic || !socketId) {
            return { error: 'Insufficient data' };
        }
        const user = await users.findOne({ username: username })
        if (!user) {
            return { error: "No such user exist" };
        }

        const newGame = new games({
            creator: username,
            secretcode: uuidv4(),
            players: [{socketId, username, profilePic }]
        })

        if (newGame) {
            await newGame.save();
            return {
                creator: newGame.creator,
                secretcode: newGame.secretcode,
                players: newGame.players,
            };
        }
        else {
            return { error: "Invalid user data" };
        }
    } catch (err) {
        console.log("Error in create game service", err.message);
        return { error: "Internal Server error" };
    }
}

async function joinRoom(socketId, username, profilePic, roomId) {
    try {
        if (!username || !profilePic || !roomId || !socketId) {
            return { error: 'Insufficient data' };
        }
        const user = await users.findOne({ username: username })
        if (!user) {
            return { error: "No such user exist" };
        }
        const game = await games.findOne({ secretcode: roomId })
        if (!game) {
            return { error: "No such game exist" };
        }
        const isGame = await games.findOneAndUpdate(
            { secretcode: roomId, 'players.username': { $ne: username } },
            { $push: { players: { username, profilePic, socketId } } },
            { upsert: false, new: true, }
        );

        if (isGame) {
            return {
                creator: isGame.creator,
                secretcode: isGame.secretcode,
                players: isGame.players,
            };
        }
        else {
            return { error: "Player already in game" };
        }
    } catch (err) {
        console.log("Error in join game service", err.message);
        return { error: "Internal Server error" };
    }
}

async function generateWord(secretcode) {
    try {
        if (!secretcode) {
            return { error: 'Insufficient data' };
        }
        const gameExists = await games.findOne({ secretcode: secretcode });
        if (!gameExists) {
            return { error: "No such game exist" };
        }
        
        const drawer = gameExists.players[(Math.floor(Math.random() * gameExists.players.length))];
        return { to: drawer.socketId, words: generaterandomwords(5) };

    } catch (err) {
        console.log("Error in generateWord service", err.message);
        return { error: "Internal Server error" };
    }
}

async function disconnected(socketId, secretcode) {
    try {
        if (!socketId || !secretcode) {
            return { error: 'Insufficient data' };
        }
        if (!socketId) {
            return { error: 'No Socket Id provided' };
        }
        const isGame = await games.findOneAndUpdate(
            { secretcode: secretcode },
            { $pull: { players: { socketId: socketId } } },
            { upsert: false, new: true, }
        );

        if (!isGame) {
            return;
        }

        if(isGame.players.length == 0){
            await games.deleteOne(
                { secretcode: secretcode }
            );
        }
    } catch (err) {
        console.log("Error in disconnect service", err.message);
        return { error: "Internal Server error" };
    }
}

module.exports = { createRoom, joinRoom, disconnected, generateWord }