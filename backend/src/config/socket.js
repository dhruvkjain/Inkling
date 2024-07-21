const { instrument } = require('@socket.io/admin-ui');
const { Server } = require('socket.io');

const { createRoom } = require('../services/game.services.js');

function socketConnection(server) {

    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'https://admin.socket.io/', 'https://admin.socket.io/#/']
        }
    });

    instrument(io, {
        auth: false,
        mode: "development",
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
            const gameData = await createRoom(username, profilePic);
            
            if(gameData.error){
                console.log(gameData.error);
                callback(gameData);
            }
            else{
                socket.join(gameData.secretcode);
                callback(gameData);
            }
        })

        socket.on('join-room', (roomId) => {
            socket.join(roomId);
        })

        // socket.onAny((event, ...args) => {
        //     console.log(event, args);
        // });

        socket.conn.on("close", (reason) => {
            console.log(`disconnected bcz ${reason}`);
        });

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