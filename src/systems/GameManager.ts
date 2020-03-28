import { Engine, NodeList, System } from '@ash.ts/ash'
import { TransformComponent } from '../components'
import { EntityCreator } from '../EntityCreator'
import { Viewport } from '../Viewport'
import {
  AsteroidCollisionNode,
  BulletCollisionNode,
  GameNode,
  SpaceshipNode,
} from '../nodes'

export class GameManager extends System {
  private viewport: Viewport

  private entityCreator: EntityCreator

  private games: NodeList<GameNode> | null = null

  private spaceships: NodeList<SpaceshipNode> | null = null

  private asteroids: NodeList<AsteroidCollisionNode> | null = null

  private bullets: NodeList<BulletCollisionNode> | null = null

  public constructor(entityCreator: EntityCreator, viewport: Viewport) {
    super()
    this.entityCreator = entityCreator
    this.viewport = viewport
  }

  public addToEngine(engine: Engine): void {
    this.games = engine.getNodeList(GameNode)
    this.spaceships = engine.getNodeList(SpaceshipNode)
    this.asteroids = engine.getNodeList(AsteroidCollisionNode)
    this.bullets = engine.getNodeList(BulletCollisionNode)
  }

  public update(time: number): void {
    const gameNode = this.games!.head
    // console.log('update', gameNode?.state)
    if (gameNode && gameNode.state.playing) {
      if (this.spaceships!.empty) {
        if (gameNode.state.lives > 0) {
          console.log('Add spaceship')
          const newSpaceshipPositionX = this.viewport.width / 2
          const newSpaceshipPositionY = this.viewport.height / 2
          let clearToAddSpaceship = true
          for (
            let asteroid = this.asteroids!.head;
            asteroid;
            asteroid = asteroid.next
          ) {
            const distance = TransformComponent.distance(asteroid.position, {
              x: newSpaceshipPositionX,
              y: newSpaceshipPositionY,
            })
            if (distance <= asteroid.collision.radius + 50) {
              clearToAddSpaceship = false
              break
            }
          }
          if (clearToAddSpaceship) {
            this.entityCreator.createSpaceship()
          }
        } else {
          gameNode.state.playing = false
          // this.entityCreator.createWaitForClick()
          gameNode.state.setForStart()
        }
      }

      if (
        this.asteroids!.empty &&
        // this.bullets!.empty &&
        this.spaceships!.head
      ) {
        // next level
        const spaceship: SpaceshipNode | null = this.spaceships!.head
        gameNode.state.level += 1
        const minAsteroids = 2
        const asteroidCount: number = minAsteroids + gameNode.state.level
        for (let i = 0; i < asteroidCount; i += 1) {
          let positionX: number
          let positionY: number
          // check not on top of spaceship
          do {
            positionX = Math.random() * this.viewport.width
            positionY = Math.random() * this.viewport.height
          } while (
            TransformComponent.distance(
              { x: positionX, y: positionY },
              spaceship.position,
            ) <= 80
          )
          this.entityCreator.createAsteroid(30, positionX, positionY)
        }
      }
    }
  }

  public removeFromEngine(engine: Engine): void {
    this.games = null
    this.spaceships = null
    this.asteroids = null
    this.bullets = null
  }
}
