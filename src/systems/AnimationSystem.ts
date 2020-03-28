import { ListIteratingSystem } from '@ash.ts/ash'
import { UpdatableNode } from '../nodes'

export class UpdateSystem extends ListIteratingSystem<UpdatableNode> {
  public constructor() {
    super(UpdatableNode)
  }

  public updateNode(node: UpdatableNode, time: number): void {
    node.updatable.updatable.update(time)
  }
}
