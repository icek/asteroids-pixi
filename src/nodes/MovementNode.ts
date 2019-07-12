import { Node, keep } from '@ash.ts/ash';
import { Motion, Position } from '../components';

export class MovementNode extends Node {
  @keep(Position)
  public position!:Position;
  @keep(Motion)
  public motion!:Motion;
}
