import { ListIteratingSystem } from '@ash.ts/ash';
import { GameConfig } from '../GameConfig';
import { MovementNode } from '../nodes';

export class MovementSystem extends ListIteratingSystem<MovementNode> {
  constructor(private readonly config:GameConfig) {
    super(MovementNode);
  }

  public updateNode(node:MovementNode, time:number):void {
    const { position, motion } = node;
    const { width, height } = this.config;
    position.x += motion.velocityX * time;
    position.y += motion.velocityY * time;
    if (position.x < 0) {
      position.x += width;
    }
    if (position.x > width) {
      position.x -= width;
    }
    if (position.y < 0) {
      position.y += height;
    }
    if (position.y > height) {
      position.y -= height;
    }
    position.rotation += motion.angularVelocity * time;
    if (motion.damping > 0) {
      const xDamp:number = Math.abs(Math.cos(position.rotation) * motion.damping * time);
      const yDamp:number = Math.abs(Math.sin(position.rotation) * motion.damping * time);
      if (motion.velocityX > xDamp) {
        motion.velocityX -= xDamp;
      } else if (motion.velocityX < -xDamp) {
        motion.velocityX += xDamp;
      } else {
        motion.velocityX = 0;
      }
      if (motion.velocityY > yDamp) {
        motion.velocityY -= yDamp;
      } else if (motion.velocityY < -yDamp) {
        motion.velocityY += yDamp;
      } else {
        motion.velocityY = 0;
      }
    }
  }
}
