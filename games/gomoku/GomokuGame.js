const Gomoku = require('gomoku-js');

class GomokuGame {
  constructor(id) {
    this.id = id;
    this.theGame = new Gomoku(19);
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
    };
  }
}

module.exports = GomokuGame;
