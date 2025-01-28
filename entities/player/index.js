import mongoose from 'mongoose';
import {broadcastPlayerMessage} from "../../webSocket/index.js";

const playerSchema = new mongoose.Schema({
    pv: { type: Number, required: true },
    lvl: { type: Number, required: true },
    inventory: { type: [String], required: true },
    gold: { type: Number, required: true }
});

playerSchema.post('findOneAndUpdate', function(doc) {
    broadcastPlayerMessage(doc);
});

const Player = mongoose.model('Player', playerSchema);

export default Player;