import GomokuGame from './gomoku';
import { Router } from 'express';
import { SUCCESS } from '../common/codes';

const games = [new GomokuGame()];

const router = new Router();

games.forEach((game) => router.use(game.getPathName(), game.getRouter()));

router.get('/list', (req, res) => {
  res.send({
    code: SUCCESS,
    games: games.map((game) => ({
      name: game.getName(),
      path: game.getPathName(),
    })),
  });
});

export default router;
