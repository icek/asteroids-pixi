import { Node, keep } from '@ash.ts/ash'
import { MotionComponent, TransformComponent } from '../components'

export class MovementNode extends Node {
  @keep(TransformComponent)
  public transform!: TransformComponent

  @keep(MotionComponent)
  public motion!: MotionComponent
}
