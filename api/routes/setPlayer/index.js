export const setPlayer = async (req, res) => {
    const updatedPlayer = await Player.findOneAndUpdate({}, playerData, { new: true });
    if (!updatedPlayer) {
        res.status(404).send({ message: 'Player data not updated' });
        return;
    }
    res.status(200).send({ message: 'Player data updated'});
}