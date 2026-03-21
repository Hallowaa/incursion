import { CharacterClassId } from '../enums/CharacterClassId'
import { IItemDto } from '../item/IItemDto'
import { ICharacterClassDto } from './ICharacterClassDto'
import { IEntityStatDto } from './IEntityStatDto'
import { IPassivePointsSpentDto } from './IPassivePointsSpentDto'

export interface ICharacterDto {
  name: string
  experience: number
  classes: ICharacterClassDto[]
  inventory: IItemDto[]
  passivePointsSpent: IPassivePointsSpentDto[]
  stats: IEntityStatDto[]
  currentIncursion: string | undefined
}
