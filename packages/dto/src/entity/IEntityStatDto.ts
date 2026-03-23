import { EntityStatId } from '../enums/EntityStatId'
import { IEntityStatBuffDto } from './IEntityStatBuffDto'

export interface IEntityStatDto {
  statId: EntityStatId
  baseValue: number
  buffs: IEntityStatBuffDto[]
  currentValue: number
}
