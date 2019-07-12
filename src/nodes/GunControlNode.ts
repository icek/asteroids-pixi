import { Node, keep } from '@ash.ts/ash';
import { Audio, Gun, GunControls, Position } from '../components';

export class GunControlNode extends Node {
  @keep(GunControls)
  public control!:GunControls;
  @keep(Gun)
  public gun!:Gun;
  @keep(Position)
  public position!:Position;
  @keep(Audio)
  public audio!:Audio;
}
