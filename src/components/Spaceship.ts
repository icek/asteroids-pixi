import { EntityStateMachine } from '@ash.ts/ash';

export class Spaceship {
  public fsm:EntityStateMachine;

  public constructor(fsm:EntityStateMachine) {
    this.fsm = fsm;
  }
}
