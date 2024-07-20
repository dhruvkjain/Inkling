const { connectToMongo , disconnectToMongo } = require('./mongo.js');
const { socketConnection } = require('./socket.js');

module.exports = {
    connectToMongo,
    disconnectToMongo,
    socketConnection,
}