import { Graphics } from 'pixi.js';

export class Dot extends Graphics {
  public velocityX:number;

  public velocityY:number;

  public constructor(maxDistance:number) {
    super();

    const angle:number = Math.random() * 2 * Math.PI;
    const distance:number = Math.random() * maxDistance;
    const speed:number = Math.random() * 10 + 10;
    this.velocityX = Math.cos(angle) * speed;
    this.velocityY = Math.sin(angle) * speed;

    this.beginFill(0xffffff)
      .drawCircle(0, 0, 1)
      .endFill()
      .setTransform(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
      );
  }
}
