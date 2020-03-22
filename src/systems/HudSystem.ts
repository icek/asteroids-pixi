import { ListIteratingSystem } from '@ash.ts/ash'
import { HudNode } from '../nodes'

export class HudSystem extends ListIteratingSystem<HudNode> {
  public constructor() {
    super(HudNode)
  }

  public updateNode(node: HudNode, time: number): void {
    node.hud.view.setLives(node.state.lives)
    node.hud.view.setScore(node.state.hits)
  }
}
