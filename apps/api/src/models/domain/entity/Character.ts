import type IPassivePointsSpent from '../../interfaces/entity/IPassivePointsSpent'
import type CharacterClass from './character-classes/CharacterClass'
import type EntityStat from './EntityStat'
import type ICharacterConfig from './ICharacterConfig'
import type Inventory from './Inventory'
import Entity from './Entity'

export default class Character extends Entity {
  public experience: number
  public classes: CharacterClass[]
  public stats: EntityStat[]
  public inventory: Inventory
  public passivePointsSpent: IPassivePointsSpent[]

  public constructor(config: ICharacterConfig) {
    super(config)

    this.experience = config.experience
    this.classes = structuredClone(config.classes)
    this.stats = structuredClone(config.stats)
    this.inventory = structuredClone(config.inventory)
    this.passivePointsSpent = structuredClone(config.passivePointsSpent)
  }
}
