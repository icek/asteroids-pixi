import { DisplayObject } from 'pixi.js';

export class Display {
  public displayObject:DisplayObject;

  public constructor(displayObject:DisplayObject) {
    this.displayObject = displayObject;
  }
}
