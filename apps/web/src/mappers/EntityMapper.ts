import type { ICharacterDto, IEntityDto } from '@incursion/dto'
import { EntityKind } from '@incursion/dto'
import Entity from '@/datatypes/business/entity/Entity'
import CharacterMapper from './CharacterMapper'
import EntityStatMapper from './EntityStatMapper'

export default class EntityMapper {
  public static toDomain(dto: IEntityDto | ICharacterDto): Entity {
    if (dto.kind === EntityKind.CHARACTER) {
      return CharacterMapper.toDomain(dto as ICharacterDto)
    }

    return new Entity(
      dto.kind,
      dto.entityId,
      dto.name,
      dto.stats.map((s) => EntityStatMapper.toDomain(s))
    )
  }
}
