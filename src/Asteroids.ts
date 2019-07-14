import { Engine, RAFTickProvider } from '@ash.ts/ash';

import { EntityCreator } from './EntityCreator';
import { GameConfig } from './GameConfig';
import { KeyPoll } from './KeyPoll';

import asteroidSound from './sounds/asteroid.mp3';
import shipSound from './sounds/ship.mp3';
import shootSound from './sounds/shoot.mp3';

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
} from './systems';

export async function asteroids(container:HTMLElement) {
  const config = new GameConfig(container.clientWidth, container.clientHeight);
  const engine = new Engine();
  const creator = new EntityCreator(engine, config);
  const keyPoll = new KeyPoll();
  const tickProvider = new RAFTickProvider();
  const audioContext = new AudioContext();
  const audioDB = new Map<string, AudioBuffer>();
  const soundNames = [asteroidSound, shipSound, shootSound];

  const loadSound = async (url:string):Promise<any> => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioDB.set(url, audioBuffer);
  };

  await Promise.all(soundNames.map(loadSound));
  tickProvider.add(delta => engine.update(delta));
  tickProvider.start();

  engine.addSystem(new WaitForStartSystem(creator), SystemPriorities.preUpdate);
  engine.addSystem(new GameManager(creator, config), SystemPriorities.preUpdate);
  engine.addSystem(new MotionControlSystem(keyPoll), SystemPriorities.update);
  engine.addSystem(new GunControlSystem(keyPoll, creator), SystemPriorities.update);
  engine.addSystem(new BulletAgeSystem(creator), SystemPriorities.update);
  engine.addSystem(new DeathThroesSystem(creator), SystemPriorities.update);
  engine.addSystem(new MovementSystem(config), SystemPriorities.move);
  engine.addSystem(new CollisionSystem(creator), SystemPriorities.resolveCollisions);
  engine.addSystem(new AnimationSystem(), SystemPriorities.animate);
  engine.addSystem(new HudSystem(), SystemPriorities.animate);
  engine.addSystem(new RenderSystem(container), SystemPriorities.render);
  engine.addSystem(new AudioSystem(audioContext, audioDB), SystemPriorities.audio);

  creator.createWaitForClick();
  creator.createGame();
}
