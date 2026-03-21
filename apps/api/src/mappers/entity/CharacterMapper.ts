import type { ICharacterDto } from '@incursion/dto'
import type ICharacter from '../../models/interfaces/entity/ICharacter'
import Character from '../../models/domain/entity/Character'
import Inventory from '../../models/domain/entity/Inventory'
import InventoryMapper from '../item/InvetoryMapper'
import CharacterClassMapper from './CharacterClassMapper'
import EntityStatMapper from './EntityStatMapper'
import PassivePointsSpentMapper from './PassivePointsSpentMapper'

export default class CharacterMapper {
  public static toDomain(doc: ICharacter): Character {
    return new Character({
      entityId: 'character',
      name: doc.name,
      experience: doc.experience,
      classes: doc.classes.map((c) => CharacterClassMapper.toDomain(c)),
      stats: doc.stats.map((s) => EntityStatMapper.toDomain(s)),
      inventory: new Inventory([]), // TODO: implement
      passivePointsSpent: [] // TODO: implement
    })
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
