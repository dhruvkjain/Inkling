const path = require('path');
const mongoServices = require(path.join(__dirname, 'mongo.js'));
const socketServices = require(path.join(__dirname, 'socket.js'));

module.exports = {
    ...mongoServices,
    ...socketServices
}