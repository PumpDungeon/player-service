import Player from '../../../entities/player/index.js';

export const getPlayer = async (req, res) => {
    const playerData = await Player.findOne();
    if (!playerData) {
        const createdPlayer  = await Player.create({
            pv: 100,
            lvl: 1,
            inventory: [
                "item"
            ],
            gold: 0
        });
        res.status(200).send({ message: 'Player found', data: createdPlayer });
    }
    res.status(200).send({ message: 'Player found', data: playerData });
}