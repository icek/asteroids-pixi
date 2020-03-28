import { ListIteratingSystem } from '@ash.ts/ash'
import { EntityCreator } from '../EntityCreator'
import { DeathThroesNode } from '../nodes'

export class DeathThroesSystem extends ListIteratingSystem<DeathThroesNode> {
  private entityCreator: EntityCreator

  public constructor(entityCreator: EntityCreator) {
    super(DeathThroesNode)
    this.entityCreator = entityCreator
  }

  public updateNode(node: DeathThroesNode, time: number): void {
    node.death.countdown -= time
    if (node.death.countdown <= 0) {
      this.entityCreator.destroyEntity(node.entity)
    }
  }
}
