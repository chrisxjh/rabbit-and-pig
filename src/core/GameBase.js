import { Router } from 'express';
import User from './User';

export default class GameBase {
  constructor(options) {
    const { name, maxPlayer = 2 } = options;

    this.name = name;
    this.maxPlayer = maxPlayer;

    this.players = [];
    this.router = new Router();
    this._init();
  }

  _init() {
    this.router.get('/', (req, res) => {
      res.send({ name: this.getName() });
    });

    this.init({ router: this.router });
  }

  init() {}

  getName() {
    return this.name;
  }

  getPathName() {
    return `/${this.name.toLowerCase()}`;
  }

  getRouter() {
    return this.router;
  }
}
