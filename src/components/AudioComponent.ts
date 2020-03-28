import { Sounds } from '../sounds'

export class AudioComponent {
  public toPlay: Sounds[] = []

  public play(sound: Sounds): void {
    this.toPlay.push(sound)
  }
}
