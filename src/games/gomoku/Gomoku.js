const MAX_PLAYERS = 2;

export default class Gomoku {
  constructor(id) {
    this.id = id;
    this.dimension = 19;
    this.players = [];

    this.init();
  }

  init() {
    this.currPlayer = 0;
    this.resetUpdate();

    this.board = new Array(this.dimension)
      .fill()
      .map(() => new Array(this.dimension).fill(null));
  }

  getId() {
    return this.id;
  }

  restart() {
    this.init();
  }

  getPlayerIndex(player) {
    return this.players.indexOf(player);
  }

  resetUpdate() {
    this.shouldUpdate = [true, true];
  }

  updatePlayer(player) {
    const index = this.getPlayerIndex(player);
    if (index < 0) return;
    this.shouldUpdate[index] = true;
  }

  hasPlayer(player) {
    return this.players.includes(player);
  }

  getPlayers() {
    return this.players;
  }

  isMaxPlayers() {
    return this.getNumberOfPlayers() >= MAX_PLAYERS;
  }

  getNumberOfPlayers() {
    return this.getPlayers().length;
  }

  addPlayer(player) {
    if (this.players.length >= MAX_PLAYERS) return;
    this.players.push(player);

    this.resetUpdate();
  }

  play(player, x, y) {
    const playerIndex = this.getPlayerIndex(player);

    if (playerIndex < 0 || playerIndex !== this.currPlayer) return;

    this.board[y][x] = playerIndex;
    this.currPlayer = this.currPlayer === 0 ? 1 : 0;
    this.shouldUpdate[this.currPlayer] = true;
  }

  getCurrentPlayer() {
    return this.players[this.currPlayer];
  }

  shouldPlayerUpdate(player) {
    const playerIndex = this.getPlayerIndex(player);
    if (playerIndex < 0) return false;

    const result = this.shouldUpdate[playerIndex];
    this.shouldUpdate[playerIndex] = false;

    return result;
  }

  getUpdate(player) {
    const playerIndex = this.getPlayerIndex(player);

    if (playerIndex < -1) return null;
    this.shouldUpdate[playerIndex] = false;

    return {
      board: this.board,
      players: this.players.map((p) => p.toJson()),
    };
  }
}
