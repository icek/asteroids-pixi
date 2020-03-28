import { Node, keep } from '@ash.ts/ash'
import { WaitForStartComponent } from '../components'

export class WaitForStartNode extends Node {
  @keep(WaitForStartComponent)
  public wait!: WaitForStartComponent
}
