import type { EntityKind } from '@incursion/dto'
import type EntityStat from './EntityStat'

export default class Entity {
  public constructor(
    public kind: EntityKind,
    public entityId: string,
    public name: string,
    public stats: EntityStat[]
  ) {}
}
