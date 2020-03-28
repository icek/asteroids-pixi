import { Engine, FrameTickProvider } from '@ash.ts/ash'
import { EntityCreator } from './EntityCreator'
import { GameConfig } from './GameConfig'
import { KeyPoll } from './KeyPoll'
import {
  AnimationSystem,
  AudioSystem,
  BulletAgeSystem,
  CollisionSystem,
  DeathThroesSystem,
  GameManager,
  GunControlSystem,
  HudSystem,
  MotionControlSystem,
  MovementSystem,
  RenderSystem,
  SystemPriorities,
  WaitForStartSystem,
} from './systems'
import { loadAudioDB } from './sounds'

export async function asteroids(container: HTMLElement) {
  const config = new GameConfig(container.clientWidth, container.clientHeight)
  const engine = new Engine()
  const entityCreator = new EntityCreator(engine, config)
  const keyPoll = new KeyPoll()
  const tickProvider = new FrameTickProvider()

  const audioContext = new AudioContext()
  const audioDB = await loadAudioDB(audioContext)

  tickProvider.add(delta => engine.update(delta))
  tickProvider.start()

  engine.addSystem(
    new WaitForStartSystem(entityCreator),
    SystemPriorities.preUpdate,
  )
  engine.addSystem(
    new GameManager(entityCreator, config),
    SystemPriorities.preUpdate,
  )
  engine.addSystem(new MotionControlSystem(keyPoll), SystemPriorities.update)
  engine.addSystem(
    new GunControlSystem(keyPoll, entityCreator),
    SystemPriorities.update,
  )
  // engine.addSystem(new BulletAgeSystem(entityCreator), SystemPriorities.update)
  engine.addSystem(
    new DeathThroesSystem(entityCreator),
    SystemPriorities.update,
  )
  engine.addSystem(new MovementSystem(config), SystemPriorities.move)
  engine.addSystem(
    new CollisionSystem(entityCreator),
    SystemPriorities.resolveCollisions,
  )
  engine.addSystem(new AnimationSystem(), SystemPriorities.animate)
  engine.addSystem(new HudSystem(), SystemPriorities.animate)
  engine.addSystem(new RenderSystem(container), SystemPriorities.render)
  engine.addSystem(
    new AudioSystem(audioContext, audioDB),
    SystemPriorities.audio,
  )

  entityCreator.createWaitForClick()
  entityCreator.createGame()
}
