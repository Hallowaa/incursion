import { IEntityStatBuffDto } from './IEntityStatBuffDto'

export interface IEntityStatDto {
  statId: string
  baseValue: number
  buffs: IEntityStatBuffDto[]
}
