import * as PIXI from 'pixi.js'

export class HudView extends PIXI.Container {
  private readonly score: PIXI.Text

  private readonly lives: PIXI.Text

  public constructor() {
    super()
    this.setTransform(400, 50)

    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
    })

    this.score = new PIXI.Text('SCORE: 0', textStyle)
    this.score.setTransform(-200 - this.score.width, 0)

    this.addChild(this.score)

    this.lives = new PIXI.Text('', textStyle)
    this.lives.setTransform(200, 0)
    this.addChild(this.lives)

    this.setScore(0)
    this.setLives(3)
  }

  public setScore(value: number): void {
    this.score.text = `SCORE: ${value}`
  }

  public setLives(value: number): void {
    this.lives.text = `LIVES: ${value}`
  }
}
