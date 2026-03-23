import type { ICharacterDto } from '@incursion/dto'
import type Incursion from '../../models/domain/incursion/Incursion'
import type ICharacter from '../../models/interfaces/entity/ICharacter'
import CharacterGenerator from '../../generators/CharacterGenerator'
import Character from '../../models/domain/entity/Character'
import Inventory from '../../models/domain/entity/Inventory'
import { IncursionInstanceModel } from '../../models/schemas/incursion/IncursionInstanceSchema'
import IncursionMapper from '../incursion/IncursionMapper'
import InventoryMapper from '../item/InvetoryMapper'
import CharacterClassMapper from './CharacterClassMapper'
import EntityStatMapper from './EntityStatMapper'
import PassivePointsSpentMapper from './PassivePointsSpentMapper'

export default class CharacterMapper {
  public static async toDomain(doc: ICharacter): Promise<Character> {
    // compare to base char and add any missing stats
    const baseCharacterStats = CharacterGenerator.generateStats()

    baseCharacterStats.forEach((bces) => {
      if (!doc.stats.some((ces) => ces.statId === bces.statId)) {
        doc.stats.push(bces)
      }
    })

    let currentIncursion: Incursion | undefined

    if (doc.currentIncursion) {
      const incursionDoc = await IncursionInstanceModel.findById(doc.currentIncursion).lean()
      if (incursionDoc) {
        currentIncursion = IncursionMapper.toDomain(incursionDoc)
      }
    }

    const character = new Character({
      entityId: 'character',
      name: doc.name,
      experience: doc.experience,
      classes: doc.classes.map((c) => CharacterClassMapper.toDomain(c)),
      stats: doc.stats.map((s) => EntityStatMapper.toDomain(s)),
      inventory: new Inventory([]), // TODO: implement
      passivePointsSpent: [], // TODO: implement
      currentIncursion
    })
    return character
  }

  public static toDto(character: Character): ICharacterDto {
    return {
      name: character.name,
      experience: character.experience,
      classes: character.classes.map((cc) => CharacterClassMapper.toDto(cc)),
      inventory: InventoryMapper.toDto(character.inventory),
      passivePointsSpent: character.passivePointsSpent.map((p) => PassivePointsSpentMapper.toDto(p)),
      stats: character.stats.map((s) => EntityStatMapper.toDto(s)),
      currentIncursion: undefined // TODO
    }
  }
}
