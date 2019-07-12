import { keep, Node } from '@ash.ts/ash';
import { Bullet, Collision, Position } from '../components';

export class BulletCollisionNode extends Node {
  @keep(Bullet)
  public bullet!:Bullet;
  @keep(Position)
  public position!:Position;
  @keep(Collision)
  public collision!:Collision;
}
