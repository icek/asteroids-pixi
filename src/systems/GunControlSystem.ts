import { ListIteratingSystem } from '@ash.ts/ash';
import { Gun, GunControls, Position } from '../components';
import { EntityCreator } from '../EntityCreator';
import { KeyPoll } from '../KeyPoll';
import { GunControlNode } from '../nodes';
import shootSound from '../sounds/shoot.mp3';

export class GunControlSystem extends ListIteratingSystem<GunControlNode> {
  private keyPoll:KeyPoll;
  private creator:EntityCreator;

  constructor(keyPoll:KeyPoll, creator:EntityCreator) {
    super(GunControlNode);
    this.keyPoll = keyPoll;
    this.creator = creator;
  }

  public updateNode(node:GunControlNode, time:number):void {
    const control:GunControls = node.control;
    const position:Position = node.position;
    const gun:Gun = node.gun;

    gun.shooting = this.keyPoll.isDown(control.trigger);
    gun.timeSinceLastShot += time;
    if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
      this.creator.createUserBullet(gun, position);
      node.audio.play(shootSound);
      gun.timeSinceLastShot = 0;
    }
  }
}
