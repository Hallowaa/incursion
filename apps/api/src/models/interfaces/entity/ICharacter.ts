import type { EntityKind } from '@incursion/dto'
import type mongoose from 'mongoose'
import type IItem from '../item/IItem'
import type IEntityStat from './IEntityStat'
import type IPassivePointsSpent from './IPassivePointsSpent'

// Used for translating between doc and domain object
export default interface ICharacter {
  _id: mongoose.Types.ObjectId
  owner: mongoose.Types.ObjectId
  name: string
  kind: EntityKind
  experience: number
  classes: string[]
  inventory: IItem[]
  passivePointsSpent: IPassivePointsSpent[]
  stats: IEntityStat[]
  currentIncursionId: mongoose.Types.ObjectId | undefined
}
