import mongoose from "mongoose"
import { IEntityStat, IItem, IPassivePointsSpent } from "../../../barrel"


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
