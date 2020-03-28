import { Animatable } from '../graphics'

export class AnimationComponent {
  public animation: Animatable

  public constructor(animation: Animatable) {
    this.animation = animation
  }
}
