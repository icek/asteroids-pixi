import { Graphics } from 'pixi.js';

export class BulletView extends Graphics {
  public constructor() {
    super();

    this.beginFill(0xffffff).drawCircle(0, 0, 2.5).endFill();
  }
}
