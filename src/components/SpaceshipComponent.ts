import { EntityStateMachine } from '@ash.ts/ash'

export class SpaceshipComponent {
  public constructor(public entityStateMachine: EntityStateMachine) {}
}
