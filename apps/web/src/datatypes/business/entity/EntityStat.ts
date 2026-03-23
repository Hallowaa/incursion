import type EntityStatBuff from './EntityStatBuff'

export default class EntityStat {
  public constructor(
    public statId: string,
    public baseValue: number,
    public buffs: EntityStatBuff[],
    public currentValue: number
  ) {}

  public get displayName(): string {
    return this.statId
      .toLocaleUpperCase()
      .replace('STAT_', '')
      .replaceAll('_', ' ')
  }
}
