export class Gun {
  public shooting:boolean = false;

  public timeSinceLastShot:number = 0;

  public offsetFromParentX:number;

  public offsetFromParentY:number;

  public minimumShotInterval:number;

  public bulletLifetime:number;

  public constructor(
    offsetFromParentX:number,
    offsetFromParentY:number,
    minimumShotInterval:number = 0,
    bulletLifetime:number = 0,
  ) {
    this.offsetFromParentX = offsetFromParentX;
    this.offsetFromParentY = offsetFromParentY;
    this.minimumShotInterval = minimumShotInterval;
    this.bulletLifetime = bulletLifetime;
  }
}
