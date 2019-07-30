import * as PIXI from 'pixi.js';

export class Display {
  public displayObject:PIXI.DisplayObject;

  public constructor(displayObject:PIXI.DisplayObject) {
    this.displayObject = displayObject;
  }
}
