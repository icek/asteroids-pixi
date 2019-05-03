export class Position {
  constructor(public x:number, public y:number, public rotation:number = 0) {
  }

  static distance(pos1:XY, pos2:XY) {
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y));
  }
}

type XY = {
  x:number;
  y:number;
};
