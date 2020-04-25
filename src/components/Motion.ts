export class Motion {
  public velocityX:number;

  public velocityY:number;

  public angularVelocity:number;

  public damping:number;

  public constructor(
    velocityX:number,
    velocityY:number,
    angularVelocity = 0,
    damping = 0,
  ) {
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.angularVelocity = angularVelocity;
    this.damping = damping;
  }
}
