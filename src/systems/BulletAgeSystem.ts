import { ListIteratingSystem } from '@ash.ts/ash'
import { EntityCreator } from '../EntityCreator'
import { BulletAgeNode } from '../nodes'

export class BulletAgeSystem extends ListIteratingSystem<BulletAgeNode> {
  private creator: EntityCreator

  public constructor(creator: EntityCreator) {
    super(BulletAgeNode)
    this.creator = creator
  }

  public updateNode(node: BulletAgeNode, time: number): void {
    const { bullet } = node
    bullet.lifeTime -= time
    if (bullet.lifeTime <= 0) {
      this.creator.destroyEntity(node.entity)
    }
  }
}
