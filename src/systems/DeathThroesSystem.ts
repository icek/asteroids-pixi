import { ListIteratingSystem } from '@ash.ts/ash';
import { EntityCreator } from '../EntityCreator';
import { DeathThroesNode } from '../nodes';

export class DeathThroesSystem extends ListIteratingSystem<DeathThroesNode> {
  private creator:EntityCreator;

  public constructor(creator:EntityCreator) {
    super(DeathThroesNode);
    this.creator = creator;
  }

  public updateNode(node:DeathThroesNode, time:number):void {
    node.death.countdown -= time;
    if (node.death.countdown <= 0) {
      this.creator.destroyEntity(node.entity);
    }
  }
}
