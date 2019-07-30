import { ListIteratingSystem } from '@ash.ts/ash';
import { AudioNode } from '../nodes';
import { Sounds } from '../sounds';

export class AudioSystem extends ListIteratingSystem<AudioNode> {
  private audioContext:AudioContext;

  private audioDB:Map<Sounds, AudioBuffer>;

  public constructor(audioContext:AudioContext, audioDB:Map<Sounds, AudioBuffer>) {
    super(AudioNode);
    this.audioContext = audioContext;
    this.audioDB = audioDB;
  }

  public updateNode(node:AudioNode, time:number):void {
    for (const name of node.audio.toPlay) {
      const sound = this.audioDB.get(name) || null;
      const source = this.audioContext.createBufferSource();
      source.buffer = sound;
      source.connect(this.audioContext.destination);
      source.start(0);
    }
    node.audio.toPlay.length = 0;
  }
}
