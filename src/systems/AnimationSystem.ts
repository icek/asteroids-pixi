import { ListIteratingSystem } from '@ash.ts/ash';
import { AnimationNode } from '../nodes';

export class AnimationSystem extends ListIteratingSystem<AnimationNode> {
  public constructor() {
    super(AnimationNode);
  }

  public updateNode(node:AnimationNode, time:number):void {
    node.animation.animation.animate(time);
  }
}
