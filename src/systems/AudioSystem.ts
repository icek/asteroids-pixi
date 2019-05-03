import { ListIteratingSystem } from '@ash.ts/ash';
import { AudioNode } from '../nodes';

export class AudioSystem extends ListIteratingSystem<AudioNode> {
  private audioContext:AudioContext;
  private audioDB:Map<string, AudioBuffer>;

  constructor(audioContext:AudioContext, audioDB:Map<string, AudioBuffer>) {
    super(AudioNode);
    this.audioContext = audioContext;
    this.audioDB = audioDB;
  }

  public updateNode(node:AudioNode, time:number):void {
    for(const name of node.audio.toPlay) {
      const sound = this.audioDB.get(name);
      const source = this.audioContext.createBufferSource();
      source.buffer = sound || null;
      source.connect(this.audioContext.destination);
      source.start(0);
    }
    node.audio.toPlay.length = 0;
  }
}
