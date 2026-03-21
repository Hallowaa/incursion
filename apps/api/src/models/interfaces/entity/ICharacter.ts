import type mongoose from 'mongoose'
import type IItem from '../item/IItem'
import type IEntityStat from './IEntityStat'
import type IPassivePointsSpent from './IPassivePointsSpent'

// Used for translating between doc and domain object
export default interface ICharacter {
  owner: mongoose.Types.ObjectId
  name: string
  experience: number
  classes: string[]
  inventory: IItem[]
  passivePointsSpent: IPassivePointsSpent[]
  stats: IEntityStat[]
  currentIncursion: mongoose.Types.ObjectId | undefined
}
