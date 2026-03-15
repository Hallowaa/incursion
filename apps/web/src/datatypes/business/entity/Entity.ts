import type { EntityStat } from '@/barrel'

export default class Entity {
  public constructor(
    public entityId: string,
    public name: string,
    public stats: EntityStat[],
    public cooldowns: Record<string, number>
  ) {}
}
