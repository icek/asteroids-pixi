export class Gun {
  public shooting = false;

  public timeSinceLastShot = 0;

  public offsetFromParentX:number;

  public offsetFromParentY:number;

  public minimumShotInterval:number;

  public bulletLifetime:number;

  public constructor(
    offsetFromParentX:number,
    offsetFromParentY:number,
    minimumShotInterval = 0,
    bulletLifetime = 0,
  ) {
    this.offsetFromParentX = offsetFromParentX;
    this.offsetFromParentY = offsetFromParentY;
    this.minimumShotInterval = minimumShotInterval;
    this.bulletLifetime = bulletLifetime;
  }
}
