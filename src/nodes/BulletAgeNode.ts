import { Node, keep } from '@ash.ts/ash'
import { BulletComponent } from '../components'

export class BulletAgeNode extends Node {
  @keep(BulletComponent)
  public bullet!: BulletComponent
}
