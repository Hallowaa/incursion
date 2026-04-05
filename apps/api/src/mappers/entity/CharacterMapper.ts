import type { ICharacterDto } from '@incursion/dto'
import type ICharacter from '../../models/interfaces/entity/ICharacter'
import { EntityKind } from '@incursion/dto'
import CharacterGenerator from '../../generators/CharacterGenerator'
import Character from '../../models/domain/entity/Character'
import Inventory from '../../models/domain/entity/Inventory'
import InventoryMapper from '../item/InvetoryMapper'
import CharacterClassMapper from './CharacterClassMapper'
import EntityStatMapper from './EntityStatMapper'
import PassivePointsSpentMapper from './PassivePointsSpentMapper'

export default class CharacterMapper {
  public static toDomain(doc: ICharacter): Character {
    // compare to base char and add any missing stats
    const baseCharacterStats = CharacterGenerator.generateStats()

    baseCharacterStats.forEach((bces) => {
      if (!doc.stats.some((ces) => ces.statId === bces.statId)) {
        doc.stats.push(bces)
      }
    })

    const character = new Character({
      _id: doc._id,
      kind: EntityKind.CHARACTER,
      name: doc.name,
      experience: doc.experience,
      classes: doc.classes.map((c) => CharacterClassMapper.toDomain(c)),
      stats: doc.stats.map((s) => EntityStatMapper.toDomain(s)),
      inventory: new Inventory([]), // TODO: implement
      passivePointsSpent: [], // TODO: implement
      currentIncursionId: doc.currentIncursionId
    })

    return character
  }

  public static toDto(character: Character): ICharacterDto {
    return {
      _id: character._id.toString(),
      kind: EntityKind.CHARACTER,
      name: character.name,
      experience: character.experience,
      classes: character.classes.map((cc) => CharacterClassMapper.toDto(cc)),
      inventory: InventoryMapper.toDto(character.inventory),
      passivePointsSpent: character.passivePointsSpent.map((p) => PassivePointsSpentMapper.toDto(p)),
      stats: character.stats.map((s) => EntityStatMapper.toDto(s)),
      currentIncursion: undefined // set after pulling from db to prevent circular dependency
    }
  }
}
