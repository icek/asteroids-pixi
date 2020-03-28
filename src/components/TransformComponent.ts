export class TransformComponent {
  public constructor(
    public x: number,
    public y: number,
    public rotation: number = 0,
  ) {}

  public static distance(pointA: Point, pointB: Point): number {
    return Math.sqrt(
      (pointA.x - pointB.x) * (pointA.x - pointB.x) +
        (pointA.y - pointB.y) * (pointA.y - pointB.y),
    )
  }
}

interface Point {
  x: number
  y: number
}
