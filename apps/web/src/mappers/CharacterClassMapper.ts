import type { ICharacterClassDto } from '@incursion/dto'
import CharacterClass from '@/datatypes/business/entity/CharacterClass'
import AbilityMapper from './AbilityMapper'
import EntityStatMapper from './EntityStatMapper'

export default class CharacterClassMapper {
  public static toDomain(dto: ICharacterClassDto): CharacterClass {
    return new CharacterClass(
      dto.name,
      dto.stats.map((s) => EntityStatMapper.toDomain(s)),
      dto.abilities.map((a) => AbilityMapper.toDomain(a)),
      dto.description
    )
  }
}
