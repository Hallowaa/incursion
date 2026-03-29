import { IIncursionDto } from '../incursion/IIncursionDto'
import { IItemDto } from '../item/IItemDto'
import { ICharacterClassDto } from './ICharacterClassDto'
import { IEntityDto } from './IEntityDto'
import { IPassivePointsSpentDto } from './IPassivePointsSpentDto'

export interface ICharacterDto extends IEntityDto {
  experience: number
  classes: ICharacterClassDto[]
  inventory: IItemDto[]
  passivePointsSpent: IPassivePointsSpentDto[]
  currentIncursion: IIncursionDto | undefined
}
