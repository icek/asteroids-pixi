import { ListIteratingSystem } from '@ash.ts/ash';
import { KeyPoll } from '../KeyPoll';
import { MotionControlNode } from '../nodes';

export class MotionControlSystem extends ListIteratingSystem<MotionControlNode> {
  private keyPoll:KeyPoll;

  public constructor(keyPoll:KeyPoll) {
    super(MotionControlNode);
    this.keyPoll = keyPoll;
  }

  public updateNode(node:MotionControlNode, time:number):void {
    const { control } = node;
    const { position } = node;
    const { motion } = node;

    if (this.keyPoll.isDown(control.left)) {
      position.rotation -= control.rotationRate * time;
    }

    if (this.keyPoll.isDown(control.right)) {
      position.rotation += control.rotationRate * time;
    }

    if (this.keyPoll.isDown(control.accelerate)) {
      motion.velocityX += Math.cos(position.rotation) * control.accelerationRate * time;
      motion.velocityY += Math.sin(position.rotation) * control.accelerationRate * time;
    }
  }
}
