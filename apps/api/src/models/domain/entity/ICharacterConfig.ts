import type IPassivePointsSpent from '../../interfaces/entity/IPassivePointsSpent'
import type Incursion from '../incursion/Incursion'
import type CharacterClass from './character-classes/CharacterClass'
import type IEntityConfig from './IEntityConfig'
import type Inventory from './Inventory'

export default interface ICharacterConfig extends IEntityConfig {
  experience: number
  classes: CharacterClass[]
  inventory: Inventory
  passivePointsSpent: IPassivePointsSpent[]
  currentIncursion: Incursion | undefined
}
