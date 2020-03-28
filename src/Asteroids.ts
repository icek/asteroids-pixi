import { Engine, FrameTickProvider } from '@ash.ts/ash'
import { EntityCreator } from './EntityCreator'
import { Viewport } from './Viewport'
import { KeyPoll } from './KeyPoll'
import {
  UpdateSystem,
  AudioSystem,
  BulletAgeSystem,
  CollisionSystem,
  DeathThroesSystem,
  SpawnSystem,
  GunControlSystem,
  HudSystem,
  MotionControlSystem,
  MovementSystem,
  RenderSystem,
  SystemPriorities,
  WaitForStartSystem,
} from './systems'
import { loadAudioDB } from './sounds'

export async function initialiseGame(container: HTMLElement) {
  const viewport = new Viewport(container.clientWidth, container.clientHeight)
  const engine = new Engine()
  const entityCreator = new EntityCreator(engine, viewport)
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
    new SpawnSystem(entityCreator, viewport),
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
  engine.addSystem(new MovementSystem(viewport), SystemPriorities.move)
  engine.addSystem(
    new CollisionSystem(entityCreator),
    SystemPriorities.resolveCollisions,
  )
  engine.addSystem(new UpdateSystem(), SystemPriorities.updatable)
  engine.addSystem(new HudSystem(), SystemPriorities.updatable)
  engine.addSystem(new RenderSystem(container), SystemPriorities.render)
  engine.addSystem(
    new AudioSystem(audioContext, audioDB),
    SystemPriorities.audio,
  )

  entityCreator.createWaitForClick()
  entityCreator.createGame()
}
