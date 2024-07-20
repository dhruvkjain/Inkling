const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
    },
    profilePic: { 
        type: String,
        default:""
    }
});


const gameSchema = new mongoose.Schema({
    creator: { 
        type: String, 
        required: true,
    },
    secretcode: {
        type: String, 
        required: true,
    },
    players: { 
        type: [playerSchema], 
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Game', gameSchema) ;
// so here instead of Game name as collection games
// will be added to mongodb