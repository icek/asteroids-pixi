import { Engine, NodeList, System } from '@ash.ts/ash'
import { EntityCreator } from '../EntityCreator'
import { Viewport } from '../Viewport'
import { GameNode, SpaceshipNode } from '../nodes'

export class ShipSpawnSystem extends System {
  private games: NodeList<GameNode> | null = null

  private spaceships: NodeList<SpaceshipNode> | null = null

  public constructor(
    public entityCreator: EntityCreator,
    public viewport: Viewport,
  ) {
    super()
  }

  public addToEngine(engine: Engine): void {
    this.games = engine.getNodeList(GameNode)
    this.spaceships = engine.getNodeList(SpaceshipNode)
  }

  public update(): void {
    const gameNode = this.games!.head
    if (!gameNode?.state.playing) {
      return
    }
    if (this.spaceships!.empty) {
      if (gameNode.state.lives > 0) {
        console.log('Add spaceship')
        const newSpaceshipPositionX = this.viewport.width / 2
        const newSpaceshipPositionY = this.viewport.height / 2
        this.entityCreator.createSpaceship(
          newSpaceshipPositionX,
          newSpaceshipPositionY,
        )
      } else {
        gameNode.state.playing = false
        gameNode.state.setForStart()
      }
    }
  }

  public removeFromEngine(): void {
    this.games = null
    this.spaceships = null
  }
}
