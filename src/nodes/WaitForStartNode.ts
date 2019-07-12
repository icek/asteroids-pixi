import { Node, keep } from '@ash.ts/ash';
import { WaitForStart } from '../components';

export class WaitForStartNode extends Node {
  @keep(WaitForStart)
  public wait!:WaitForStart;
}
