const { Router } = require('express');
const GomokuGame = require('./GomokuGame.js');

const gomoku = new Router();

const gamesMap = new Map();

const NAME = 'Gomoku';

gomoku.get('/', (req, res) => {
  res.end(NAME);
});

gomoku.post('/start', (req, res) => {
  let { id } = req.query;
  let game, playerId;

  if (!id) {
    id = `${NAME}_${Date.now()}`;
    game = new GomokuGame(id);
    gamesMap.set(id, game);
    playerId = game.player1;
  } else if (gamesMap.has(id)) {
    game = gamesMap.get(id);
    playerId = game.player2;
  } else {
    res.status(404).send();
    return;
  }

  res.send({ id, playerId });
});

gomoku.get('/:gameId/update', (req, res) => {
  const { gameId } = req.params;

  if (!gamesMap.has(gameId)) return res.status(404).send();

  const game = gamesMap.get(gameId);

  res.send(game.getUpdate());
});

gomoku.put('/:gameId/play', (req, res) => {
  const { gameId } = req.params;

  if (!gamesMap.has(gameId)) return res.status(404).send();

  try {
    const { playerId, x, y } = req.body;
    const game = gamesMap.get(gameId);

    game.play(playerId, x, y);

    res.send({ code: 'SUCCESS', update: game.getUpdate() });
  } catch (err) {
    console.error(err);
    res.status(200).send({
      code: 'ERROR',
      message: err.message,
    });
  }
});

module.exports = gomoku;
