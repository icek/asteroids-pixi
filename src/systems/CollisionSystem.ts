import { Engine, NodeList, System } from '@ash.ts/ash';
import { Position } from '../components';
import { EntityCreator } from '../EntityCreator';
import { AsteroidCollisionNode, BulletCollisionNode, GameNode, SpaceshipCollisionNode } from '../nodes';
import { Sounds } from '../sounds';

export class CollisionSystem extends System {
  private creator:EntityCreator;

  private games:NodeList<GameNode> | null = null;

  private spaceships:NodeList<SpaceshipCollisionNode> | null = null;

  private asteroids:NodeList<AsteroidCollisionNode> | null = null;

  private bullets:NodeList<BulletCollisionNode> | null = null;

  public constructor(creator:EntityCreator) {
    super();
    this.creator = creator;
  }

  public addToEngine(engine:Engine):void {
    this.games = engine.getNodeList(GameNode);
    this.spaceships = engine.getNodeList(SpaceshipCollisionNode);
    this.asteroids = engine.getNodeList(AsteroidCollisionNode);
    this.bullets = engine.getNodeList(BulletCollisionNode);
  }

  public update(time:number):void {
    for (let bullet = this.bullets!.head; bullet; bullet = bullet.next) {
      for (let asteroid = this.asteroids!.head; asteroid; asteroid = asteroid.next) {
        const distance = Position.distance(asteroid.position, bullet.position);
        if (distance <= asteroid.collision.radius) {
          this.creator.destroyEntity(bullet.entity);
          if (asteroid.collision.radius > 10) {
            const radius = asteroid.collision.radius - 10;
            let x = asteroid.position.x + Math.random() * 10 - 5;
            let y = asteroid.position.y + Math.random() * 10 - 5;
            this.creator.createAsteroid(radius, x, y);
            x = asteroid.position.x + Math.random() * 10 - 5;
            y = asteroid.position.y + Math.random() * 10 - 5;
            this.creator.createAsteroid(radius, x, y);
          }
          asteroid.asteroid.fsm.changeState('destroyed');
          asteroid.audio.play(Sounds.asteroid);
          if (this.games!.head) {
            this.games!.head.state.hits += 1;
          }
          break;
        }
      }
    }

    for (let spaceship = this.spaceships!.head; spaceship; spaceship = spaceship.next) {
      for (let asteroid = this.asteroids!.head; asteroid; asteroid = asteroid.next) {
        const distance = Position.distance(asteroid.position, spaceship.position);
        if (distance <= asteroid.collision.radius + spaceship.collision.radius) {
          spaceship.spaceship.fsm.changeState('destroyed');
          spaceship.audio.play(Sounds.ship);
          if (this.games!.head) {
            this.games!.head.state.lives -= 1;
          }
          break;
        }
      }
    }
  }

  public removeFromEngine(engine:Engine):void {
    this.games = null;
    this.spaceships = null;
    this.asteroids = null;
    this.bullets = null;
  }
}
