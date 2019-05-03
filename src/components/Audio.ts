export class Audio {
  public toPlay:string[] = [];

  public play(sound:string):void {
    this.toPlay.push(sound);
  }
}

