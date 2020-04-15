export default class User {
  constructor(id, name, options) {
    const { timestamp } = options;

    this.id = id;
    this.name = name;
    this.timestamp = timestamp;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  toJson() {
    return { id: this.id, name: this.name };
  }
}
