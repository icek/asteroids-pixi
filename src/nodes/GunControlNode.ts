import { Node, keep } from '@ash.ts/ash'
import {
  AudioComponent,
  GunComponent,
  GunControlsComponent,
  TransformComponent,
} from '../components'

export class GunControlNode extends Node {
  @keep(GunControlsComponent)
  public control!: GunControlsComponent

  @keep(GunComponent)
  public gun!: GunComponent

  @keep(TransformComponent)
  public position!: TransformComponent

  @keep(AudioComponent)
  public audio!: AudioComponent
}
