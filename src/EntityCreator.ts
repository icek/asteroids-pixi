import { Engine, Entity, EntityStateMachine } from '@ash.ts/ash'
import {
  AnimationComponent,
  AsteroidComponent,
  AudioComponent,
  BulletComponent,
  CollisionComponent,
  DeathThroesComponent,
  DisplayComponent,
  GameStateComponent,
  GunComponent,
  GunControlsComponent,
  HudComponent,
  MotionComponent,
  MotionControlsComponent,
  TransformComponent,
  SpaceshipComponent,
  WaitForStartComponent,
} from './components'
import { Viewport } from './Viewport'
import {
  AsteroidDeathView,
  AsteroidView,
  BulletView,
  HudView,
  SpaceshipDeathView,
  SpaceshipView,
  WaitForStartView,
} from './graphics'
import * as Keyboard from './Keyboard'

export class EntityCreator {
  private waitEntity!: Entity

  constructor(private engine: Engine, private viewport: Viewport) {}

  public destroyEntity(entity: Entity): void {
    this.engine.removeEntity(entity)
  }

  public createGame(): Entity {
    const hud: HudView = new HudView()

    const gameEntity: Entity = new Entity('game')
      .add(new GameStateComponent())
      .add(new HudComponent(hud))
      .add(new DisplayComponent(hud))
      .add(new TransformComponent(this.viewport.width / 2, 25, 0))
    this.engine.addEntity(gameEntity)
    return gameEntity
  }

  public createWaitForClick(): Entity {
    if (!this.waitEntity) {
      const waitView: WaitForStartView = new WaitForStartView()

      this.waitEntity = new Entity('wait')
        .add(new WaitForStartComponent(waitView))
        .add(new DisplayComponent(waitView))
        .add(
          new TransformComponent(
            this.viewport.width / 2,
            this.viewport.height / 2,
            0,
          ),
        )
    }
    this.waitEntity.get(WaitForStartComponent)!.startGame = false
    this.engine.addEntity(this.waitEntity)
    return this.waitEntity
  }

  public createAsteroid(radius: number, x: number, y: number): Entity {
    const asteroid: Entity = new Entity()

    const fsm: EntityStateMachine = new EntityStateMachine(asteroid)

    const velocityX = (Math.random() - 0.5) * 4 * (50 - radius)
    const velocityY = (Math.random() - 0.5) * 4 * (50 - radius)
    const angularVelocity: number = Math.random() * 2 - 1

    fsm
      .createState('alive')
      .add(MotionComponent)
      .withInstance(new MotionComponent(velocityX, velocityY, angularVelocity))
      .add(CollisionComponent)
      .withInstance(new CollisionComponent(radius))
      .add(DisplayComponent)
      .withInstance(new DisplayComponent(new AsteroidView(radius)))

    const deathView: AsteroidDeathView = new AsteroidDeathView(radius)
    fsm
      .createState('destroyed')
      .add(DeathThroesComponent)
      .withInstance(new DeathThroesComponent(3))
      .add(DisplayComponent)
      .withInstance(new DisplayComponent(deathView))
      .add(AnimationComponent)
      .withInstance(new AnimationComponent(deathView))

    asteroid
      .add(new AsteroidComponent(fsm))
      .add(new TransformComponent(x, y, 0))
      .add(new AudioComponent())

    fsm.changeState('alive')
    this.engine.addEntity(asteroid)
    return asteroid
  }

  public createSpaceship(): Entity {
    const spaceship: Entity = new Entity()
    const fsm: EntityStateMachine = new EntityStateMachine(spaceship)

    fsm
      .createState('playing')
      .add(MotionComponent)
      .withInstance(new MotionComponent(0, 0, 0, 15))
      .add(MotionControlsComponent)
      .withInstance(
        new MotionControlsComponent(
          Keyboard.LEFT,
          Keyboard.RIGHT,
          Keyboard.UP,
          100,
          3,
        ),
      )
      .add(GunComponent)
      .withInstance(new GunComponent(8, 0, 0.3, 2))
      .add(GunControlsComponent)
      .withInstance(new GunControlsComponent(Keyboard.SPACE))
      .add(CollisionComponent)
      .withInstance(new CollisionComponent(9))
      .add(DisplayComponent)
      .withInstance(new DisplayComponent(new SpaceshipView()))

    const deathView: SpaceshipDeathView = new SpaceshipDeathView()
    fsm
      .createState('destroyed')
      .add(DeathThroesComponent)
      .withInstance(new DeathThroesComponent(5))
      .add(DisplayComponent)
      .withInstance(new DisplayComponent(deathView))
      .add(AnimationComponent)
      .withInstance(new AnimationComponent(deathView))

    spaceship
      .add(new SpaceshipComponent(fsm))
      .add(
        new TransformComponent(
          this.viewport.width / 2,
          this.viewport.height / 2,
          0,
        ),
      )
      .add(new AudioComponent())

    fsm.changeState('playing')
    this.engine.addEntity(spaceship)
    return spaceship
  }

  public createUserBullet(
    gun: GunComponent,
    parentPosition: TransformComponent,
  ): Entity {
    const cos: number = Math.cos(parentPosition.rotation)
    const sin: number = Math.sin(parentPosition.rotation)
    const bullet: Entity = new Entity()
      .add(new BulletComponent(gun.bulletLifetime))
      .add(
        new TransformComponent(
          cos * gun.offsetFromParentX -
            sin * gun.offsetFromParentY +
            parentPosition.x,
          sin * gun.offsetFromParentX +
            cos * gun.offsetFromParentY +
            parentPosition.y,
          0,
        ),
      )
      .add(new CollisionComponent(0))
      .add(new MotionComponent(cos * 150, sin * 150, 0, 0))
      .add(new DisplayComponent(new BulletView()))
    this.engine.addEntity(bullet)
    return bullet
  }
}
