import { Node, keep } from '@ash.ts/ash'
import { DeathThroesComponent } from '../components'

export class DeathThroesNode extends Node {
  @keep(DeathThroesComponent)
  public death!: DeathThroesComponent
}
