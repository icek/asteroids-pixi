import { Node, keep } from '@ash.ts/ash';
import { Audio } from '../components';

export class AudioNode extends Node {
  @keep(Audio)
  public audio!:Audio;
}
