import { Animatable } from './Animatable';
import { Dot } from './Dot';
import * as PIXI from 'pixi.js';

export class AsteroidDeathView extends PIXI.Container implements Animatable {
  private static numDots:number = 8;

  private dots:Dot[] = [];

  constructor(radius:number) {
    super();
    const len = AsteroidDeathView.numDots;
    for(let i:number = 0; i < len; ++i) {
      const dot:Dot = new Dot(radius);
      this.addChild(dot);
      this.dots.push(dot);
    }
  }

  public animate(time:number):void {
    for(const dot of this.dots) {
      dot.setTransform(
        dot.x + dot.velocityX * time,
        dot.y + dot.velocityY * time,
      );
    }
  }
}
