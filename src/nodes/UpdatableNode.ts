import { keep, Node } from '@ash.ts/ash'
import { UpdatableComponent } from '../components'

export class UpdatableNode extends Node {
  @keep(UpdatableComponent)
  public updatable!: UpdatableComponent
}
