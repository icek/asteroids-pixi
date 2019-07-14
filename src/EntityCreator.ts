import { Engine, Entity, EntityStateMachine } from '@ash.ts/ash';
import {
  Animation,
  Asteroid,
  Audio,
  Bullet,
  Collision,
  DeathThroes,
  Display,
  GameState,
  Gun,
  GunControls,
  Hud,
  Motion,
  MotionControls,
  Position,
  Spaceship,
  WaitForStart,
} from './components';
import { GameConfig } from './GameConfig';
import {
  AsteroidDeathView,
  AsteroidView,
  BulletView,
  HudView,
  SpaceshipDeathView,
  SpaceshipView,
  WaitForStartView,
} from './graphics';
import * as Keyboard from './Keyboard';

export class EntityCreator {
  private waitEntity!:Entity;

  constructor(
    private engine:Engine,
    private config:GameConfig,
  ) {
  }

  public destroyEntity(entity:Entity):void {
    this.engine.removeEntity(entity);
  }

  public createGame():Entity {
    const hud:HudView = new HudView();

    const gameEntity:Entity = new Entity('game')
      .add(new GameState())
      .add(new Hud(hud))
      .add(new Display(hud))
      .add(new Position(this.config.width / 2, 25, 0));
    this.engine.addEntity(gameEntity);
    return gameEntity;
  }

  public createWaitForClick():Entity {
    if (!this.waitEntity) {
      const waitView:WaitForStartView = new WaitForStartView();

      this.waitEntity = new Entity('wait')
        .add(new WaitForStart(waitView))
        .add(new Display(waitView))
        .add(new Position(this.config.width / 2, this.config.height / 2, 0));
    }
    this.waitEntity.get(WaitForStart)!.startGame = false;
    this.engine.addEntity(this.waitEntity);
    return this.waitEntity;
  }

  public createAsteroid(radius:number, x:number, y:number):Entity {
    const asteroid:Entity = new Entity();

    const fsm:EntityStateMachine = new EntityStateMachine(asteroid);

    const velocityX = (Math.random() - 0.5) * 4 * (50 - radius);
    const velocityY = (Math.random() - 0.5) * 4 * (50 - radius);
    const angularVelocity:number = Math.random() * 2 - 1;

    fsm.createState('alive')
      .add(Motion).withInstance(new Motion(velocityX, velocityY, angularVelocity))
      .add(Collision).withInstance(new Collision(radius))
      .add(Display).withInstance(new Display(new AsteroidView(radius)));

    const deathView:AsteroidDeathView = new AsteroidDeathView(radius);
    fsm.createState('destroyed')
      .add(DeathThroes).withInstance(new DeathThroes(3))
      .add(Display).withInstance(new Display(deathView))
      .add(Animation).withInstance(new Animation(deathView));

    asteroid
      .add(new Asteroid(fsm))
      .add(new Position(x, y, 0))
      .add(new Audio());

    fsm.changeState('alive');
    this.engine.addEntity(asteroid);
    return asteroid;
  }

  public createSpaceship():Entity {
    const spaceship:Entity = new Entity();
    const fsm:EntityStateMachine = new EntityStateMachine(spaceship);

    fsm.createState('playing')
      .add(Motion).withInstance(new Motion(0, 0, 0, 15))
      .add(MotionControls).withInstance(new MotionControls(Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, 100, 3))
      .add(Gun).withInstance(new Gun(8, 0, 0.3, 2))
      .add(GunControls).withInstance(new GunControls(Keyboard.SPACE))
      .add(Collision).withInstance(new Collision(9))
      .add(Display).withInstance(new Display(new SpaceshipView()));

    const deathView:SpaceshipDeathView = new SpaceshipDeathView();
    fsm.createState('destroyed')
      .add(DeathThroes).withInstance(new DeathThroes(5))
      .add(Display).withInstance(new Display(deathView))
      .add(Animation).withInstance(new Animation(deathView));

    spaceship
      .add(new Spaceship(fsm))
      .add(new Position(this.config.width / 2, this.config.height / 2, 0))
      .add(new Audio());

    fsm.changeState('playing');
    this.engine.addEntity(spaceship);
    return spaceship;
  }

  public createUserBullet(gun:Gun, parentPosition:Position):Entity {
    const cos:number = Math.cos(parentPosition.rotation);
    const sin:number = Math.sin(parentPosition.rotation);
    const bullet:Entity = new Entity()
      .add(new Bullet(gun.bulletLifetime))
      .add(new Position(
        cos * gun.offsetFromParentX - sin * gun.offsetFromParentY + parentPosition.x,
        sin * gun.offsetFromParentX + cos * gun.offsetFromParentY + parentPosition.y, 0))
      .add(new Collision(0))
      .add(new Motion(cos * 150, sin * 150, 0, 0))
      .add(new Display(new BulletView()));
    this.engine.addEntity(bullet);
    return bullet;
  }
}
