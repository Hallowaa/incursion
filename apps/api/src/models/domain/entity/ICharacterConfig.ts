import type mongoose from 'mongoose'
import type IPassivePointsSpent from '../../interfaces/entity/IPassivePointsSpent'
import type CharacterClass from './character-classes/CharacterClass'
import type IEntityConfig from './IEntityConfig'
import type Inventory from './Inventory'

export default interface ICharacterConfig extends IEntityConfig {
  experience: number
  classes: CharacterClass[]
  inventory: Inventory
  passivePointsSpent: IPassivePointsSpent[]
  currentIncursionId: mongoose.Types.ObjectId | undefined
}
