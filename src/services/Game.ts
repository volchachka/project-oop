export class Game {
  private static readonly game: Game = new Game();

  public static getInstance() {
    return this.game;
  }

  private constructor() {}
}
