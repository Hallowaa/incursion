import type EntityStat from './EntityStat'

export default class Entity {
  public constructor(
    public entityId: string,
    public name: string,
    public stats: EntityStat[]
  ) {}
}
