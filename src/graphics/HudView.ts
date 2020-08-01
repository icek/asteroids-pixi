import { Container, TextStyle, Text } from 'pixi.js';

export class HudView extends Container {
  private readonly score:Text;

  private readonly lives:Text;

  public constructor() {
    super();
    this.setTransform(400, 50);

    const textStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
    });

    this.score = new Text('SCORE: 0', textStyle);
    this.score.setTransform(-200 - this.score.width, 0);

    this.addChild(this.score);

    this.lives = new Text('', textStyle);
    this.lives.setTransform(200, 0);
    this.addChild(this.lives);

    this.setScore(0);
    this.setLives(3);
  }

  public setScore(value:number):void {
    this.score.text = `SCORE: ${value}`;
  }

  public setLives(value:number):void {
    this.lives.text = `LIVES: ${value}`;
  }
}
