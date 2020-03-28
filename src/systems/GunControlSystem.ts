import { ListIteratingSystem } from '@ash.ts/ash'
import { EntityCreator } from '../EntityCreator'
import { KeyPoll } from '../KeyPoll'
import { GunControlNode } from '../nodes'
import { Sounds } from '../sounds'

export class GunControlSystem extends ListIteratingSystem<GunControlNode> {
  private keyPoll: KeyPoll

  private entityCreator: EntityCreator

  public constructor(keyPoll: KeyPoll, entityCreator: EntityCreator) {
    super(GunControlNode)
    this.keyPoll = keyPoll
    this.entityCreator = entityCreator
  }

  public updateNode(node: GunControlNode, time: number): void {
    const { controls: control } = node
    const { transform } = node
    const { gun } = node

    gun.shooting = this.keyPoll.isDown(control.trigger)
    gun.timeSinceLastShot += time
    if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
      this.entityCreator.createUserBullet(gun, transform)
      node.audio.play(Sounds.shoot)
      gun.timeSinceLastShot = 0
    }
  }
}
