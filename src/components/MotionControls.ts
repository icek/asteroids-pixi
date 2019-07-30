export class MotionControls {
  public left:number;

  public right:number;

  public accelerate:number;

  public accelerationRate:number;

  public rotationRate:number;

  public constructor(
    left:number = 0,
    right:number = 0,
    accelerate:number = 0,
    accelerationRate:number = 0,
    rotationRate:number = 0,
  ) {
    this.left = left;
    this.right = right;
    this.accelerate = accelerate;
    this.accelerationRate = accelerationRate;
    this.rotationRate = rotationRate;
  }
}
