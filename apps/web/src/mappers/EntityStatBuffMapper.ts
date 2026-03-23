import type { IEntityStatBuffDto } from '@incursion/dto'
import EntityStatBuff from '@/datatypes/business/entity/EntityStatBuff'

export default class EntityStatBuffMapper {
  public static toDomain(dto: IEntityStatBuffDto) {
    return new EntityStatBuff(
      dto.name,
      dto.flatValue,
      dto.percentualValue,
      dto.isAdditive,
      dto.imageUrl
    )
  }
}
