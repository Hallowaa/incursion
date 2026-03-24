import type Position from '../incursion/Position'
import type EntityStat from './EntityStat'

export default class Entity {
  public constructor(
    public entityId: string,
    public name: string,
    public stats: EntityStat[],
    public position: Position | undefined
  ) {}
}
