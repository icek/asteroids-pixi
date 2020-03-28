import { Engine, FrameTickProvider } from '@ash.ts/ash'
import { EntityCreator } from './EntityCreator'
import { Viewport } from './Viewport'
import { KeyPoll } from './KeyPoll'
import {
  ShipSpawnSystem,
  MotionControlSystem,
  MovementSystem,
  RenderSystem,
  SystemPriorities,
} from './systems'

export async function initialiseGame(container: HTMLElement) {
  const viewport = new Viewport(container.clientWidth, container.clientHeight)
  const engine = new Engine()
  const entityCreator = new EntityCreator(engine, viewport)
  const keyPoll = new KeyPoll()
  const tickProvider = new FrameTickProvider()

  tickProvider.add(delta => engine.update(delta))
  tickProvider.start()

  engine.addSystem(
    new ShipSpawnSystem(entityCreator, viewport),
    SystemPriorities.preUpdate,
  )
  engine.addSystem(new MotionControlSystem(keyPoll), SystemPriorities.update)
  engine.addSystem(new MovementSystem(viewport), SystemPriorities.move)
  engine.addSystem(new RenderSystem(container), SystemPriorities.render)
  entityCreator.createBasicGame()
}
