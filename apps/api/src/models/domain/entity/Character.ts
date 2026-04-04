import type mongoose from 'mongoose'
import type IPassivePointsSpent from '../../interfaces/entity/IPassivePointsSpent'
import type Ability from '../ability/Ability'
import type CharacterClass from './character-classes/CharacterClass'
import type EntityStat from './EntityStat'
import type ICharacterConfig from './ICharacterConfig'
import type Inventory from './Inventory'
import Entity from './Entity'
import EntityStatBuff from './EntityStatBuff'

export default class Character extends Entity {
  public experience: number
  public classes: CharacterClass[]
  public stats: EntityStat[]
  public inventory: Inventory
  public passivePointsSpent: IPassivePointsSpent[]
  public currentIncursionId: mongoose.Types.ObjectId | undefined

  public constructor(config: ICharacterConfig) {
    super(config)

    this.experience = config.experience
    this.classes = config.classes
    this.stats = config.stats
    this.inventory = config.inventory
    this.passivePointsSpent = config.passivePointsSpent
    this.currentIncursionId = config.currentIncursionId
    this.computeStats()
  }

  public addCharacterClass(characterClass: CharacterClass) {
    this.classes.push(characterClass)
    this.computeStats()
  }

  public computeStats() {
    // add stats from every class
    const statMap = new Map(this.stats.map((s) => [s.statId, s]))

    for (const characterClass of this.classes) {
      for (const classStat of characterClass.stats) {
        const stat = statMap.get(classStat.statId)
        if (stat) {
          stat.addBuff(new EntityStatBuff(characterClass.name, classStat.baseValue, 0, true, ''))
        }
      }
    }

    // TODO: add stats from passive tree
    // TODO: add stats from items
  }

  public getAbilities(): Ability[] {
    const result = []

    for (const c of this.classes) {
      for (const ability of c.abilities) {
        result.push(ability)
      }
    }

    return result
  }
}
