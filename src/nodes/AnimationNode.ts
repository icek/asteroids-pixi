import { keep, Node } from '@ash.ts/ash'
import { AnimationComponent } from '../components'

export class AnimationNode extends Node {
  @keep(AnimationComponent)
  public animation!: AnimationComponent
}
