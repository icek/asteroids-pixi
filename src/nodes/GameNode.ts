import { Node, keep } from '@ash.ts/ash'
import { GameStateComponent } from '../components'

export class GameNode extends Node {
  @keep(GameStateComponent)
  public state!: GameStateComponent
}
