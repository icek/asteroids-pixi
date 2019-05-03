import { Engine, NodeList, System } from '@ash.ts/ash';
import { Position } from '../components';
import { EntityCreator } from '../EntityCreator';
import { GameConfig } from '../GameConfig';
import { AsteroidCollisionNode, BulletCollisionNode, GameNode, SpaceshipNode } from '../nodes';

export class GameManager extends System {
  private config:GameConfig;
  private creator:EntityCreator;

  private games:NodeList<GameNode> | null = null;
  private spaceships:NodeList<SpaceshipNode> | null = null;
  private asteroids:NodeList<AsteroidCollisionNode> | null = null;
  private bullets:NodeList<BulletCollisionNode> | null = null;

  constructor(creator:EntityCreator, config:GameConfig) {
    super();
    this.creator = creator;
    this.config = config;
  }

  public addToEngine(engine:Engine):void {
    this.games = engine.getNodeList(GameNode);
    this.spaceships = engine.getNodeList(SpaceshipNode);
    this.asteroids = engine.getNodeList(AsteroidCollisionNode);
    this.bullets = engine.getNodeList(BulletCollisionNode);
  }

  public update(time:number):void {
    const gameNode = this.games!.head;
    if (gameNode && gameNode.state.playing) {
      if (this.spaceships!.empty) {
        if (gameNode.state.lives > 0) {
          const newSpaceshipPositionX = this.config.width / 2;
          const newSpaceshipPositionY = this.config.height / 2;
          let clearToAddSpaceship:boolean = true;
          for (let asteroid = this.asteroids!.head; asteroid; asteroid = asteroid.next) {
            if (Position.distance(asteroid.position, { x: newSpaceshipPositionX, y: newSpaceshipPositionY }) <= asteroid.collision.radius + 50) {
              clearToAddSpaceship = false;
              break;
            }
          }
          if (clearToAddSpaceship) {
            this.creator.createSpaceship();
          }
        } else {
          gameNode.state.playing = false;
          this.creator.createWaitForClick();
        }
      }

      if (this.asteroids!.empty && this.bullets!.empty && this.spaceships!.head) {
        // next level
        const spaceship:SpaceshipNode | null = this.spaceships!.head;
        gameNode.state.level++;
        const minAsteroids = 2;
        const asteroidCount:number = minAsteroids + gameNode.state.level;
        for (let i:number = 0; i < asteroidCount; ++i) {
          let positionX:number;
          let positionY:number;
          // check not on top of spaceship
          do {
            positionX = Math.random() * this.config.width;
            positionY = Math.random() * this.config.height;
          }
          while (Position.distance({ x: positionX, y: positionY }, spaceship.position) <= 80);
          this.creator.createAsteroid(30, positionX, positionY);
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
