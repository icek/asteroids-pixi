import { Graphics } from 'pixi.js';

export class SpaceshipView extends Graphics {
  public constructor() {
    super();
    this.moveTo(10, 0).beginFill(0xffffff).lineTo(-7, 7).lineTo(-4, 0)
      .lineTo(-7, -7)
      .lineTo(10, 0)
      .endFill();
  }
}
