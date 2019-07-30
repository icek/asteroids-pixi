export class Position {
  public x:number;

  public y:number;

  public rotation:number;

  public constructor(x:number, y:number, rotation:number = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  public static distance(pos1:XY, pos2:XY):number {
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y));
  }
}

interface XY {
  x:number;
  y:number;
}
