export class MotionControls {
  public left:number;

  public right:number;

  public accelerate:number;

  public accelerationRate:number;

  public rotationRate:number;

  public constructor(
    left = 0,
    right = 0,
    accelerate = 0,
    accelerationRate = 0,
    rotationRate = 0,
  ) {
    this.left = left;
    this.right = right;
    this.accelerate = accelerate;
    this.accelerationRate = accelerationRate;
    this.rotationRate = rotationRate;
  }
}
