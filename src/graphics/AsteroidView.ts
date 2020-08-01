import { Graphics } from 'pixi.js';

export class AsteroidView extends Graphics {
  public constructor(radius:number) {
    super();

    this.moveTo(radius, 0).beginFill(0xffffff);
    let angle = 0;
    while (angle < Math.PI * 2) {
      const length:number = (0.75 + Math.random() * 0.25) * radius;
      const posX:number = Math.cos(angle) * length;
      const posY:number = Math.sin(angle) * length;
      this.lineTo(posX, posY);
      angle += Math.random() * 0.5;
    }
    this.lineTo(radius, 0).endFill();
  }
}
