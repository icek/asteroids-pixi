import { Node, keep } from '@ash.ts/ash'
import {
  AudioComponent,
  GunComponent,
  GunControlsComponent,
  TransformComponent,
} from '../components'

export class GunControlNode extends Node {
  @keep(GunControlsComponent)
  public controls!: GunControlsComponent

  @keep(GunComponent)
  public gun!: GunComponent

  @keep(TransformComponent)
  public transform!: TransformComponent

  @keep(AudioComponent)
  public audio!: AudioComponent
}
