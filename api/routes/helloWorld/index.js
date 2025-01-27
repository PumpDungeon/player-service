
export const helloWorld =  async (req, res) => {
    res.status(200).send({ message: 'Hello World !'});
}