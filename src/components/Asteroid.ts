import { EntityStateMachine } from '@ash.ts/ash';

export class Asteroid {
  public fsm:EntityStateMachine;

  public constructor(fsm:EntityStateMachine) {
    this.fsm = fsm;
  }
}
