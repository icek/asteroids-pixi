import * as PIXI from 'pixi.js'

export class DisplayComponent {
  public object: PIXI.DisplayObject

  public constructor(displayObject: PIXI.DisplayObject) {
    this.object = displayObject
  }
}
