import GameBase from '../../core/GameBase';
import {
  NOT_FOUND,
  SUCCESS,
  NOT_YOUR_TURN,
  MAX_PLAYERS_REACHED,
  SPACE_OCCUPIED,
} from '../../common/codes';
import Gomoku from './Gomoku';

export default class GomokuGame extends GameBase {
  constructor() {
    super({ name: 'Gomoku', maxPlayers: 2 });

    this.dimension = 19;
    this.games = new Map();
  }

  init({ router }) {
    const validateGame = (req, res, next) => {
      const { gameId } = req.query;

      if (!this.games.has(gameId)) {
        res.send({ code: NOT_FOUND, message: 'Game not found' });
        return;
      }

      req.game = this.games.get(gameId);

      next();
    };

    router.post('/start', (req, res) => {
      let {
        user,
        query: { gameId },
      } = req;

      if (!gameId) {
        gameId = `${this.getName()}_${Date.now()}`;
        const game = new Gomoku(gameId);
        this.games.set(gameId, game);
        game.addPlayer(user);

        return res.send({
          code: SUCCESS,
          id: gameId,
        });
      }

      validateGame(req, res, () => {
        const { game, user } = req;

        const hasPlayer = game.hasPlayer(user);

        if (!hasPlayer && game.isMaxPlayers()) {
          return res.send({
            code: MAX_PLAYERS_REACHED,
          });
        }

        if (!hasPlayer) game.addPlayer(user);

        game.updatePlayer(user);
        res.send({
          code: SUCCESS,
          id: gameId,
        });
      });
    });

    router.put('/restart', validateGame, (req, res) => {
      const { game } = req;
      game.restart();
      res.send({ code: SUCCESS, gameId: game.getId() });
    });

    router.get('/update', validateGame, (req, res) => {
      const { game, user } = req;
      if (!game.shouldPlayerUpdate(user)) {
        return res.send({ code: SUCCESS });
      }

      res.send({ code: SUCCESS, update: game.getUpdate(user) });
    });

    router.put('/play', validateGame, (req, res) => {
      const { game, user, query } = req;
      const { x, y } = query;

      if (game.getCurrentPlayer() !== user) {
        return res.send({
          code: NOT_YOUR_TURN,
          message: "It's not your turn.",
        });
      }

      if (game.isOccupied(x, y)) {
        return res.send({
          code: SPACE_OCCUPIED,
          message: 'This spot is occupied.',
        });
      }

      game.play(user, x, y);

      res.send({ code: SUCCESS, update: game.getUpdate(user) });
    });
  }
}
