export class MotionComponent {
  public velocityX: number

  public velocityY: number

  public angularVelocity: number

  public damping: number

  public constructor(
    velocityX: number,
    velocityY: number,
    angularVelocity: number = 0,
    damping: number = 0,
  ) {
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.angularVelocity = angularVelocity
    this.damping = damping
  }
}
