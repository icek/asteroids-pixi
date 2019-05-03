import { ListIteratingSystem } from '@ash.ts/ash';
import { Motion, MotionControls, Position } from '../components';
import { KeyPoll } from '../KeyPoll';
import { MotionControlNode } from '../nodes';

export class MotionControlSystem extends ListIteratingSystem<MotionControlNode> {
  private keyPoll:KeyPoll;

  constructor(keyPoll:KeyPoll) {
    super(MotionControlNode);
    this.keyPoll = keyPoll;
  }

  public updateNode(node:MotionControlNode, time:number):void {
    const control:MotionControls = node.control;
    const position:Position = node.position;
    const motion:Motion = node.motion;

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
