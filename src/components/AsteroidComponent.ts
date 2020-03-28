import { EntityStateMachine } from '@ash.ts/ash'

export class AsteroidComponent {
  public fsm: EntityStateMachine

  public constructor(fsm: EntityStateMachine) {
    this.fsm = fsm
  }
}
