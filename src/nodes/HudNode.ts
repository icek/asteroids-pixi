import { Node, keep } from '@ash.ts/ash';
import { GameState, Hud } from '../components';

export class HudNode extends Node {
  @keep(GameState)
  public state!:GameState;
  @keep(Hud)
  public hud!:Hud;
}
