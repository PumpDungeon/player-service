import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    pv: { type: Number, required: true },
    lvl: { type: Number, required: true },
    inventory: { type: [String], required: true },
    gold: { type: Number, required: true }
});

const Player = mongoose.model('Player', playerSchema);

export default Player;