import { Node, keep } from '@ash.ts/ash'
import { DisplayComponent, TransformComponent } from '../components'

export class RenderNode extends Node {
  @keep(TransformComponent)
  public transform!: TransformComponent

  @keep(DisplayComponent)
  public display!: DisplayComponent
}
