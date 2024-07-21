const games = require('../models/game.model.js');
const users = require('../models/user.model.js');
const { v4: uuidv4 } = require('uuid');

async function createRoom(username, profilePic) {
    try {
        if (!username || !profilePic) {
            return { error: 'Insufficient data' };
        }
        const user = await users.findOne({ username: username })
        if (!user) {
            return { error: "No such user exist" };
        }

        const newGame = new games({
            creator: username,
            secretcode: uuidv4(),
            players: [{username, profilePic}]
        })

        if (newGame) {
            await newGame.save();
            return {
                creator: newGame.creator,
                secretcode: newGame.secretcode,
            };
        }
        else{
            return { error: "Invalid user data" };
        }
    } catch (err) {
        console.log("Error in create game service",err.message);
        return { error: "Internal Server error" };
    }
}

module.exports = { createRoom }