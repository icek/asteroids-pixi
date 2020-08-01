import { Container, Graphics } from 'pixi.js';

import { Animatable } from './Animatable';

export class SpaceshipDeathView extends Container implements Animatable {
  private readonly shape1:Graphics;

  private readonly shape2:Graphics;

  private readonly vel1x:number;

  private readonly vel1y:number;

  private readonly vel2x:number;

  private readonly vel2y:number;

  private readonly rot1:number;

  private readonly rot2:number;

  public constructor() {
    super();

    this.shape1 = new Graphics();
    this.shape1.moveTo(10, 0).beginFill(0xffffff).lineTo(-7, 7).lineTo(-4, 0)
      .lineTo(10, 0)
      .endFill();
    this.addChild(this.shape1);

    this.shape2 = new Graphics();
    this.shape2.moveTo(10, 0).beginFill(0xffffff).lineTo(-7, -7).lineTo(-4, 0)
      .lineTo(10, 0)
      .endFill();
    this.addChild(this.shape2);

    this.vel1x = Math.random() * 10 - 5;
    this.vel1y = Math.random() * 10 + 10;
    this.vel2x = Math.random() * 10 - 5;
    this.vel2y = Math.random() * -10 - 10;
    this.rot1 = Math.random() * 3 - 1.5;
    this.rot2 = Math.random() * 3 - 1.5;
  }

  public animate(time:number):void {
    const { shape1, shape2 } = this;
    shape1.setTransform(
      shape1.x + this.vel1x * time,
      shape1.y + this.vel1y * time,
      1,
      1,
      shape1.rotation + this.rot1 * time,
    );
    shape2.setTransform(
      shape2.x + this.vel2x * time,
      shape2.y + this.vel2y * time,
      1,
      1,
      shape2.rotation + this.rot2 * time,
    );
  }
}
