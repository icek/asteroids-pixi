import { Node, keep } from '@ash.ts/ash';
import { Position, Spaceship } from '../components';

export class SpaceshipNode extends Node {
  @keep(Spaceship)
  public spaceship!:Spaceship;
  @keep(Position)
  public position!:Position;
}
