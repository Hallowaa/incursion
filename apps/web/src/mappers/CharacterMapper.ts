import type { ICharacterDto } from '@incursion/dto'
import Character from '@/datatypes/business/entity/Character'
import EntityStatMapper from './EntityStatMapper'
import IncursionMapper from './IncursionMapper'
import InventoryMapper from './InventoryMapper'

export default class CharacterMapper {
  public static toDomain(dto: ICharacterDto) {
    return new Character(
      dto.name,
      dto.experience,
      dto.classes, // TODO: change to actual char class objects
      InventoryMapper.toDomain(dto.inventory),
      [],
      dto.stats.map((stat) => EntityStatMapper.toDomain(stat)),
      dto.currentIncursion ? IncursionMapper.toDomain(dto.currentIncursion) : undefined
    )
  }
}
