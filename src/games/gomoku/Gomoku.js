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
    this.updates = [[], []];

    this.board = new Array(this.dimension)
      .fill()
      .map(() => new Array(this.dimension).fill(null));
  }

  getId() {
    return this.id;
  }

  restart() {
    this.init();
    this.pushUpdate({ type: 'board', board: this.board });
  }

  getPlayerIndex(player) {
    return this.players.indexOf(player);
  }

  hasPlayer(player) {
    return this.players.includes(player);
  }

  getPlayers() {
    return this.players;
  }

  isOccupied(x, y) {
    return this.board[y][x] !== null;
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
    this.refreshPlayer(player);
  }

  pushUpdate(update, playerIndex) {
    if (playerIndex === undefined) {
      this.updates[0].push(update);
      this.updates[1].push(update);
      return;
    }

    if (playerIndex < 0) return;
    this.updates[playerIndex].push(update);
  }

  refreshPlayer(player) {
    const playerIndex = this.getPlayerIndex(player);

    this.pushUpdate({ type: 'board', board: this.board }, playerIndex);
  }

  play(player, x, y) {
    const playerIndex = this.getPlayerIndex(player);

    if (
      playerIndex < 0 ||
      playerIndex !== this.currPlayer ||
      this.isOccupied(x, y)
    )
      return;

    this.board[y][x] = playerIndex;
    this.currPlayer = this.currPlayer === 0 ? 1 : 0;

    this.pushUpdate({
      type: 'move',
      player: player.getId(),
      x,
      y,
      value: playerIndex,
    });
  }

  getCurrentPlayer() {
    return this.players[this.currPlayer];
  }

  shouldPlayerUpdate(player) {
    const playerIndex = this.getPlayerIndex(player);

    if (playerIndex < 0) return false;
    return this.updates[playerIndex].length > 0;
  }

  getUpdate(player) {
    const playerIndex = this.getPlayerIndex(player);

    if (playerIndex < -1) return null;

    const playerUpdates = this.updates[playerIndex].reverse();
    this.updates[playerIndex] = [];

    return playerUpdates;
  }
}
