import { Signal0 } from '@ash.ts/ash';
import { Container, Text, TextStyle } from 'pixi.js';

export class WaitForStartView extends Container {
  private readonly gameOver:Text;

  private readonly clickToStart:Text;

  public click:Signal0 = new Signal0();

  public constructor() {
    super();

    const style = {
      fontFamily: 'Arial',
      fill: 0xffffff,
    };

    // GAME OVER
    this.gameOver = new Text('ASTEROIDS', new TextStyle({
      ...style,
      fontSize: 50,
    }));
    this.gameOver.setTransform(-this.gameOver.width / 2, -50);

    this.addChild(this.gameOver);

    this.clickToStart = new Text('Click to start', new TextStyle({
      ...style,
      fontSize: 20,
    }));
    this.clickToStart.setTransform(-this.clickToStart.width / 2, 50);

    this.addChild(this.clickToStart);

    // EVENTS
    this.on('addedToStage', this.addClickListener);
    this.on('removedFromStage', this.removeClickListener);
  }

  private dispatchClick = ():void => {
    this.click.dispatch();
  };

  private addClickListener = ():void => {
    window.addEventListener('click', this.dispatchClick);
  };

  private removeClickListener = ():void => {
    window.removeEventListener('click', this.dispatchClick);
    this.gameOver.text = 'GAME OVER';
  };
}
