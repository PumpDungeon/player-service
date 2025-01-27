import Player from '../../../entities/player/index.js';

export default async (req, res) => {
    const playerData = await Player.findOne();
    if (!playerData) {
        res.status(404).send({ message: 'Player not found' });
        return;
    }
    res.status(200).send({ message: 'Player found', data: playerData });
}