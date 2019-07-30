import { Signal0 } from '@ash.ts/ash';
import * as PIXI from 'pixi.js';

export class WaitForStartView extends PIXI.Container {
  private readonly gameOver:PIXI.Text;

  private readonly clickToStart:PIXI.Text;

  public click:Signal0 = new Signal0();

  public constructor() {
    super();

    const style = {
      fontFamily: 'Arial',
      fill: 0xffffff,
    };

    // GAME OVER
    this.gameOver = new PIXI.Text('ASTEROIDS', new PIXI.TextStyle({
      ...style,
      fontSize: 50,
    }));
    this.gameOver.setTransform(-this.gameOver.width / 2, -50);

    this.addChild(this.gameOver);

    this.clickToStart = new PIXI.Text('Click to start', new PIXI.TextStyle({
      ...style,
      fontSize: 20,
    }));
    this.clickToStart.setTransform(-this.clickToStart.width / 2, 50);

    this.addChild(this.clickToStart);

    // EVENTS
    this.on('addedToStage', this.addClickListener);
    this.on('removedFromStage', this.removeClickListener);
  }

  private dispatchClick = () => {
    this.click.dispatch();
  };

  private addClickListener = () => {
    window.addEventListener('click', this.dispatchClick);
  };

  private removeClickListener = () => {
    window.removeEventListener('click', this.dispatchClick);
    this.gameOver.text = 'GAME OVER';
  };
}
