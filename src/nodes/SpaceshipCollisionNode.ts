import { keep, Node } from '@ash.ts/ash'
import {
  AudioComponent,
  CollisionComponent,
  TransformComponent,
  SpaceshipComponent,
} from '../components'

export class SpaceshipCollisionNode extends Node {
  @keep(SpaceshipComponent)
  public spaceship!: SpaceshipComponent

  @keep(TransformComponent)
  public position!: TransformComponent

  @keep(CollisionComponent)
  public collision!: CollisionComponent

  @keep(AudioComponent)
  public audio!: AudioComponent
}
