export class GameState {
  public lives = 0;

  public level = 0;

  public hits = 0;

  public playing = false;

  public setForStart():void {
    this.lives = 3;
    this.level = 0;
    this.hits = 0;
    this.playing = true;
  }
}
