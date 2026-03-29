import type { ICharacterDto, IEntityDto } from '@incursion/dto'
import { EntityKind } from '@incursion/dto'
import Character from '@/datatypes/business/entity/Character'
import Entity from '@/datatypes/business/entity/Entity'
import EntityStatMapper from './EntityStatMapper'
import IncursionMapper from './IncursionMapper'
import InventoryMapper from './InventoryMapper'

export default class EntityMapper {
  public static toDomain(dto: IEntityDto | ICharacterDto): Entity {
    if (dto.kind === EntityKind.CHARACTER) {
      const cdto = dto as ICharacterDto
      return new Character(
        cdto.name,
        cdto.experience,
        cdto.classes,
        InventoryMapper.toDomain(cdto.inventory),
        [],
        cdto.stats.map((s) => EntityStatMapper.toDomain(s)),
        cdto.currentIncursion ? IncursionMapper.toDomain(cdto.currentIncursion) : undefined
      )
    }

    return new Entity(
      dto.kind,
      dto.entityId,
      dto.name,
      dto.stats.map((s) => EntityStatMapper.toDomain(s))
    )
  }
}
