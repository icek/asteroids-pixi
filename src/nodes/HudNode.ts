import { Node, keep } from '@ash.ts/ash'
import { GameStateComponent, HudComponent } from '../components'

export class HudNode extends Node {
  @keep(GameStateComponent)
  public state!: GameStateComponent

  @keep(HudComponent)
  public hud!: HudComponent
}
