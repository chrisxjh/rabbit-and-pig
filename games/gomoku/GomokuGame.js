const Gomoku = require('gomoku-js');

class GomokuGame {
  constructor(id) {
    this.dimension = 19;
    this.id = id;
    this.theGame = new Gomoku(this.dimension);
    this.winner = null;
    this.player1 = 1;
    this.player2 = 2;
  }

  play(playerId, x, y) {
    this.winner = this.theGame.setChessOf(playerId, x, y);
  }

  getUpdate() {
    return {
      winner: this.winner,
      board: this.theGame.board,
      dimension: this.dimension,
    };
  }
}

module.exports = GomokuGame;
