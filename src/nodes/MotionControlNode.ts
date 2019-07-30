import { Node, keep } from '@ash.ts/ash';
import { Motion, MotionControls, Position } from '../components';

export class MotionControlNode extends Node {
  @keep(MotionControls)
  public control!:MotionControls;

  @keep(Position)
  public position!:Position;

  @keep(Motion)
  public motion!:Motion;
}
