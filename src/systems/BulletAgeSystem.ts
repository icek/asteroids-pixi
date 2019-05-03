import { ListIteratingSystem } from '@ash.ts/ash';
import { Bullet } from '../components';
import { EntityCreator } from '../EntityCreator';
import { BulletAgeNode } from '../nodes';

export class BulletAgeSystem extends ListIteratingSystem<BulletAgeNode> {
  private creator:EntityCreator;

  constructor(creator:EntityCreator) {
    super(BulletAgeNode);
    this.creator = creator;
  }

  public updateNode(node:BulletAgeNode, time:number):void {
    const bullet:Bullet = node.bullet;
    bullet.lifeTime -= time;
    if (bullet.lifeTime <= 0) {
      this.creator.destroyEntity(node.entity);
    }
  }
}
