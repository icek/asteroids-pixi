import { ListIteratingSystem } from '@ash.ts/ash'
import { KeyPoll } from '../KeyPoll'
import { MotionControlNode } from '../nodes'

export class MotionControlSystem extends ListIteratingSystem<
  MotionControlNode
> {
  private keyPoll: KeyPoll

  public constructor(keyPoll: KeyPoll) {
    super(MotionControlNode)
    this.keyPoll = keyPoll
  }

  public updateNode(node: MotionControlNode, time: number): void {
    const { control } = node
    const { transform } = node
    const { motion } = node

    if (this.keyPoll.isDown(control.left)) {
      transform.rotation -= control.rotationRate * time
    }

    if (this.keyPoll.isDown(control.right)) {
      transform.rotation += control.rotationRate * time
    }

    if (this.keyPoll.isDown(control.accelerate)) {
      motion.velocityX +=
        Math.cos(transform.rotation) * control.accelerationRate * time
      motion.velocityY +=
        Math.sin(transform.rotation) * control.accelerationRate * time
    }
  }
}
