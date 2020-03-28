import { keep, Node } from '@ash.ts/ash'
import {
  BulletComponent,
  CollisionComponent,
  TransformComponent,
} from '../components'

export class BulletCollisionNode extends Node {
  @keep(BulletComponent)
  public bullet!: BulletComponent

  @keep(TransformComponent)
  public position!: TransformComponent

  @keep(CollisionComponent)
  public collision!: CollisionComponent
}
