import { ListIteratingSystem } from '@ash.ts/ash'
import { EntityCreator } from '../EntityCreator'
import { BulletAgeNode } from '../nodes'

export class BulletAgeSystem extends ListIteratingSystem<BulletAgeNode> {
  private entityCreator: EntityCreator

  public constructor(entityCreator: EntityCreator) {
    super(BulletAgeNode)
    this.entityCreator = entityCreator
  }

  public updateNode(node: BulletAgeNode, time: number): void {
    const { bullet } = node
    bullet.lifeTime -= time
    if (bullet.lifeTime <= 0) {
      this.entityCreator.destroyEntity(node.entity)
    }
  }
}
