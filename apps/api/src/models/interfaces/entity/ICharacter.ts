import mongoose from "mongoose"
import IItem from "../IItem"
import IEntityStat from "./IEntityStat"
import IPassivePointsSpent from "./IPassivePointsSpent"

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
