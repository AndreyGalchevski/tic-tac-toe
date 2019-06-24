const gameService = require('./gameService');

const makeMove = async (req, res) => {
  try {
    const updatedGameState = await gameService.makeMove(req.body);
    res.send(updatedGameState);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  makeMove,
};
