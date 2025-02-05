import Player from '../../../entities/player/index.js';

export const setPlayer = async (req, res) => {
    try {
        const playerData = req.body;
        console.log('playerData to update : ', playerData);
        const updatedPlayer = await Player.findOneAndUpdate(
            {},
            {
                ...playerData
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).send({ message: 'Player data updated', player: updatedPlayer });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la mise à jour du joueur.' });
    }
};
