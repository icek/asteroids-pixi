import { keep, Node } from '@ash.ts/ash';
import { Asteroid, Audio, Collision, Position } from '../components';

export class AsteroidCollisionNode extends Node {
  @keep(Asteroid)
  public asteroid!:Asteroid;
  @keep(Position)
  public position!:Position;
  @keep(Collision)
  public collision!:Collision;
  @keep(Audio)
  public audio!:Audio;
}
