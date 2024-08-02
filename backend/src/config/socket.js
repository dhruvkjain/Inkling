const { instrument } = require('@socket.io/admin-ui');
const { Server } = require('socket.io');

const { verifyToken } = require('../utils')
const { createRoom, joinRoom, disconnected, generateWord, setCurrentWord, checkGuess } = require('../services/game.services.js');


function socketConnection(server) {

    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'https://admin.socket.io/', 'https://admin.socket.io/#/'],
            credentials: true, // enable credentials
        }
    });

    instrument(io, {
        auth: false,
        mode: "development",
    })

    io.use((socket, next)=>{
        // console.log(socket.request.headers.cookie);
        const cookies = socket.request.headers.cookie;
        let token ;
        cookies.split(';').forEach((ck)=>{
            token = ( ck.trim().includes('jwt') ) 
            ? ck.trim().substring(4)
            : ''
        });

        if(token != ''){
            verifyToken(token, next);
        }
        else{
            next(new Error("Unauthorized - No Token Provided, Re-login"));
        }
    })

    io.on('connection', (socket) => {
        // console.log(socket.id);

        socket.on('checkSocketId', (socketId, callback) => {
            const exists = io.sockets.sockets.has(socketId);
            callback(exists);
        });

        socket.on('send-message', (message, socketId) => {
            console.log(message ,socketId);
            socket.to(socketId).emit('receive-message', message);
        })

        socket.on('create-room', async(username, profilePic, callback) => {
            const gameData = await createRoom(socket.id, username, profilePic);
            
            if(gameData.error){
                console.log(gameData.error);
                callback(gameData);
            }
            else{
                socket.join(gameData.secretcode);
                callback(gameData);
            }
        })

        socket.on('join-room', async(username, profilePic, roomId, callback) => {
            const gameData = await joinRoom(socket.id, username, profilePic, roomId);
            if(gameData.error){
                // console.log(gameData.error);
                callback(gameData);
            }
            else{
                socket.join(roomId);
                socket.to(roomId).emit("notification",`${username} joined !!`);
                socket.to(roomId).emit("update-gameDetails", gameData);
                callback(gameData);
            }
        })

        socket.on('generate-word', async(secretcode) => {
            const gameData = await generateWord(secretcode);
            if(gameData.error){
                socket.to(secretcode).emit("notification",`Error, Restart game: ${gameData.error}`);
            }
            else{
                io.to(gameData.to).emit("select-word", gameData.words);
            }
        })
 
        socket.on('selected-word', async(word, secretcode, callback) => {
            const res = await setCurrentWord(word, secretcode);
            if(res.error){
                callback(res);
            }
            callback({});
        })

        socket.on('submit-guess', async(word, secretcode, username, callback) => {
            const res = await checkGuess(word, secretcode, username);
            if(res.error){
                callback(res);
            }
            if(res.ok){
                io.to(secretcode).emit("notification",`${username} guessed correctly, word was: ${word}`);
            }
            callback(res);
        })

        // socket.onAny((event, ...args) => {
        //     console.log(event, args);
        // });

        socket.conn.on("close", (reason) => {
            console.log(`disconnected bcz ${reason}, ${socket.id}`);
        });

        socket.on("leave-game" , (secretcode)=>{
            disconnected(socket.id,secretcode);
        })

        socket.on("connect_error", (err) => {
            if (err && err.message === "unauthorized event") {
                socket.disconnect();
            }
            else {
                console.log(err);
            }
        });
    })
}

module.exports = { socketConnection }