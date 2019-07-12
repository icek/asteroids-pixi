import { Node, keep } from '@ash.ts/ash';
import { DeathThroes } from '../components';

export class DeathThroesNode extends Node {
  @keep(DeathThroes)
  public death!:DeathThroes;
}
