import { Node, keep } from '@ash.ts/ash'
import {
  MotionComponent,
  MotionControlsComponent,
  TransformComponent,
} from '../components'

export class MotionControlNode extends Node {
  @keep(MotionControlsComponent)
  public control!: MotionControlsComponent

  @keep(TransformComponent)
  public transform!: TransformComponent

  @keep(MotionComponent)
  public motion!: MotionComponent
}
