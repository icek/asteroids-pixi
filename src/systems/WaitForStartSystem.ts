import { Engine, NodeList, System } from '@ash.ts/ash'
import { EntityCreator } from '../EntityCreator'
import { AsteroidCollisionNode, GameNode, WaitForStartNode } from '../nodes'

export class WaitForStartSystem extends System {
  private entityCreator: EntityCreator

  private gameNodes: NodeList<GameNode> | null = null

  private waitNodes: NodeList<WaitForStartNode> | null = null

  private asteroids: NodeList<AsteroidCollisionNode> | null = null

  public constructor(entityCreator: EntityCreator) {
    super()
    this.entityCreator = entityCreator
  }

  public addToEngine(engine: Engine): void {
    this.waitNodes = engine.getNodeList(WaitForStartNode)
    this.gameNodes = engine.getNodeList(GameNode)
    this.asteroids = engine.getNodeList(AsteroidCollisionNode)
  }

  public update(time: number): void {
    if (!this.waitNodes || !this.gameNodes || !this.asteroids) {
      return
    }

    const waitForStartNode: WaitForStartNode | null = this.waitNodes.head
    const game: GameNode | null = this.gameNodes.head
    if (waitForStartNode && waitForStartNode.wait.startGame && game) {
      for (
        let asteroid: AsteroidCollisionNode | null = this.asteroids.head;
        asteroid;
        asteroid = asteroid.next
      ) {
        if (asteroid.entity) {
          this.entityCreator.destroyEntity(asteroid.entity)
        }
      }
      console.log('Start!')
      game.state.setForStart()
      waitForStartNode.wait.startGame = false
      if (waitForStartNode.entity) {
        this.entityCreator.destroyEntity(waitForStartNode.entity)
      }
    }
  }

  public removeFromEngine(engine: Engine): void {
    this.gameNodes = null
    this.waitNodes = null
    this.asteroids = null
  }
}
