export class Position {
  public x:number;

  public y:number;

  public rotation:number;

  public constructor(x:number, y:number, rotation = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
}
