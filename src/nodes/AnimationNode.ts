import { keep, Node } from '@ash.ts/ash';
import { Animation } from '../components';

export class AnimationNode extends Node<AnimationNode> {
  @keep(Animation)
  public animation!:Animation;
}
