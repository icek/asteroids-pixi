import { Node, keep } from '@ash.ts/ash'
import { TransformComponent, SpaceshipComponent } from '../components'

export class SpaceshipNode extends Node {
  @keep(SpaceshipComponent)
  public spaceship!: SpaceshipComponent

  @keep(TransformComponent)
  public transform!: TransformComponent
}
