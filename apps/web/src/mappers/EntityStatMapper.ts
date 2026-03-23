import type { IEntityStatDto } from '@incursion/dto'
import EntityStat from '@/datatypes/business/entity/EntityStat'
import EntityStatBuffMapper from './EntityStatBuffMapper'

export default class EntityStatMapper {
  public static toDomain(dto: IEntityStatDto) {
    return new EntityStat(
      dto.statId,
      dto.baseValue,
      dto.buffs.map((buff) => EntityStatBuffMapper.toDomain(buff)),
      dto.currentValue
    )
  }
}
