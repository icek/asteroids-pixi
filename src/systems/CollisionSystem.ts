import { Engine, NodeList, System } from '@ash.ts/ash'
import { TransformComponent } from '../components'
import { EntityCreator } from '../EntityCreator'
import {
  AsteroidCollisionNode,
  BulletCollisionNode,
  GameNode,
  SpaceshipCollisionNode,
} from '../nodes'
import { Sounds } from '../sounds'

export class CollisionSystem extends System {
  private games: NodeList<GameNode> | null = null

  private spaceships: NodeList<SpaceshipCollisionNode> | null = null

  private asteroids: NodeList<AsteroidCollisionNode> | null = null

  private bullets: NodeList<BulletCollisionNode> | null = null

  public constructor(public entityCreator: EntityCreator) {
    super()
  }

  public addToEngine(engine: Engine): void {
    this.games = engine.getNodeList(GameNode)
    this.spaceships = engine.getNodeList(SpaceshipCollisionNode)
    this.asteroids = engine.getNodeList(AsteroidCollisionNode)
    this.bullets = engine.getNodeList(BulletCollisionNode)
  }

  public update(): void {
    for (let bullet = this.bullets!.head; bullet; bullet = bullet.next) {
      for (
        let asteroid = this.asteroids!.head;
        asteroid;
        asteroid = asteroid.next
      ) {
        const distance = TransformComponent.distance(
          asteroid.transform,
          bullet.transform,
        )
        if (distance <= asteroid.collision.radius) {
          this.entityCreator.destroyEntity(bullet.entity)
          if (asteroid.collision.radius > 10) {
            const radius = asteroid.collision.radius - 10
            let x = asteroid.transform.x + Math.random() * 10 - 5
            let y = asteroid.transform.y + Math.random() * 10 - 5
            this.entityCreator.createAsteroid(radius, x, y)
            x = asteroid.transform.x + Math.random() * 10 - 5
            y = asteroid.transform.y + Math.random() * 10 - 5
            this.entityCreator.createAsteroid(radius, x, y)
          }
          asteroid.asteroid.fsm.changeState('destroyed')
          asteroid.audio.play(Sounds.asteroid)
          if (this.games!.head) {
            this.games!.head.state.hits += 1
          }
          break
        }
      }
    }

    for (
      let spaceship = this.spaceships!.head;
      spaceship;
      spaceship = spaceship.next
    ) {
      for (
        let asteroid = this.asteroids!.head;
        asteroid;
        asteroid = asteroid.next
      ) {
        const distance = TransformComponent.distance(
          asteroid.transform,
          spaceship.transform,
        )
        if (
          distance <=
          asteroid.collision.radius + spaceship.collision.radius
        ) {
          spaceship.spaceship.finiteStateMachine.changeState('destroyed')
          spaceship.audio.play(Sounds.ship)
          if (this.games!.head) {
            this.games!.head.state.lives -= 1
          }
          break
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
