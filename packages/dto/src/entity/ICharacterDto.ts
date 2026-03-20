import { CharacterClassId } from '../enums/CharacterClassId'
import { IItemDto } from '../item/IItemDto'
import { IEntityStatDto } from './IEntityStatDto'
import { IPassivePointsSpentDto } from './IPassivePointsSpentDto'

export interface ICharacterDto {
  _id: string
  owner: string
  name: string
  experience: number
  classes: CharacterClassId[]
  inventory: IItemDto[]
  passivePointsSpent: IPassivePointsSpentDto[]
  stats: IEntityStatDto[]
  currentIncursion: string | undefined
}
