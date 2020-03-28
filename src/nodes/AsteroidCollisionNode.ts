import { keep, Node } from '@ash.ts/ash'
import {
  AsteroidComponent,
  AudioComponent,
  CollisionComponent,
  TransformComponent,
} from '../components'

export class AsteroidCollisionNode extends Node {
  @keep(AsteroidComponent)
  public asteroid!: AsteroidComponent

  @keep(TransformComponent)
  public position!: TransformComponent

  @keep(CollisionComponent)
  public collision!: CollisionComponent

  @keep(AudioComponent)
  public audio!: AudioComponent
}
