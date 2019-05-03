import { Node, keep } from '@ash.ts/ash';
import { Bullet } from '../components';

export class BulletAgeNode extends Node<BulletAgeNode> {
  @keep(Bullet)
  public bullet!:Bullet;
}
