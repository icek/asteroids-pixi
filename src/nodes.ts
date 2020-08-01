import { defineNode } from '@ash.ts/ash';
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

export const AnimationNode = defineNode({
  animation: Animation,
}, 'AnimationNode');
export type AnimationNode = InstanceType<typeof AnimationNode>;

export const AsteroidCollisionNode = defineNode({
  asteroid: Asteroid,
  position: Position,
  collision: Collision,
  audio: Audio,
}, 'AsteroidCollisionNode');
export type AsteroidCollisionNode = InstanceType<typeof AsteroidCollisionNode>;

export const AudioNode = defineNode({
  audio: Audio,
}, 'AudioNode');
export type AudioNode = InstanceType<typeof AudioNode>;

export const BulletAgeNode = defineNode({
  bullet: Bullet,
}, 'BulletAgeNode');
export type BulletAgeNode = InstanceType<typeof BulletAgeNode>;

export const BulletCollisionNode = defineNode({
  bullet: Bullet,
  position: Position,
  collision: Collision,
}, 'BulletCollisionNode');
export type BulletCollisionNode = InstanceType<typeof BulletCollisionNode>;

export const DeathThroesNode = defineNode({
  death: DeathThroes,
}, 'DeathThroesNode');
export type DeathThroesNode = InstanceType<typeof DeathThroesNode>;

export const GameNode = defineNode({
  state: GameState,
}, 'GameNode');
export type GameNode = InstanceType<typeof GameNode>;

export const GunControlNode = defineNode({
  control: GunControls,
  gun: Gun,
  position: Position,
  audio: Audio,
}, 'GunControlNode');
export type GunControlNode = InstanceType<typeof GunControlNode>;

export const HudNode = defineNode({
  state: GameState,
  hud: Hud,
}, 'HudNode');
export type HudNode = InstanceType<typeof HudNode>;

export const MotionControlNode = defineNode({
  control: MotionControls,
  position: Position,
  motion: Motion,
}, 'MotionControlNode');
export type MotionControlNode = InstanceType<typeof MotionControlNode>;

export const MovementNode = defineNode({
  position: Position,
  motion: Motion,
}, 'MovementNode');
export type MovementNode = InstanceType<typeof MovementNode>;

export const RenderNode = defineNode({
  position: Position,
  display: Display,
}, 'RenderNode');
export type RenderNode = InstanceType<typeof RenderNode>;

export const SpaceshipCollisionNode = defineNode({
  spaceship: Spaceship,
  position: Position,
  collision: Collision,
  audio: Audio,
}, 'SpaceshipCollisionNode');
export type SpaceshipCollisionNode = InstanceType<typeof SpaceshipCollisionNode>;

export const SpaceshipNode = defineNode({
  spaceship: Spaceship,
  position: Position,
}, 'SpaceshipNode');
export type SpaceshipNode = InstanceType<typeof SpaceshipNode>;

export const WaitForStartNode = defineNode({
  wait: WaitForStart,
}, 'WaitForStartNode');
export type WaitForStartNode = InstanceType<typeof WaitForStartNode>;
