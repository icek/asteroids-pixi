import { Node, keep } from '@ash.ts/ash';
import { GameState } from '../components';

export class GameNode extends Node<GameNode> {
  @keep(GameState)
  public state!:GameState;
}
