import { Node, keep } from '@ash.ts/ash'
import { AudioComponent } from '../components'

export class AudioNode extends Node {
  @keep(AudioComponent)
  public audio!: AudioComponent
}
