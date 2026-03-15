import { IEntityStatDto } from './IEntityStatDto'

export interface ICharacterDto {
  _id: string
  owner: string
  name: string
  experience: number
  classes: string[]
  inventory: object[]
  passivePointsSpent: object[]
  stats: IEntityStatDto[]
  currentIncursion: string | undefined
}
