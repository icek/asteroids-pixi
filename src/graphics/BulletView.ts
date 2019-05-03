import * as PIXI from 'pixi.js';

export class BulletView extends PIXI.Graphics {
  constructor() {
    super();

    this.beginFill(0xffffff).drawCircle(0, 0, 2.5).endFill();
  }
}
