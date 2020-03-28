import * as PIXI from 'pixi.js'
import { Updatable } from './Updatable'
import { Dot } from './Dot'

export class AsteroidDeathView extends PIXI.Container implements Updatable {
  private static numDots: number = 8

  private dots: Dot[] = []

  public constructor(radius: number) {
    super()
    const len = AsteroidDeathView.numDots
    for (let i = 0; i < len; i += 1) {
      const dot: Dot = new Dot(radius)
      this.addChild(dot)
      this.dots.push(dot)
    }
  }

  public update(time: number): void {
    for (const dot of this.dots) {
      dot.setTransform(
        dot.x + dot.velocityX * time,
        dot.y + dot.velocityY * time,
      )
    }
  }
}
