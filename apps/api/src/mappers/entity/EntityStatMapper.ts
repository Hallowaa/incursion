import type { IEntityStatDto } from '@incursion/dto'
import type IEntityStat from '../../models/interfaces/entity/IEntityStat'
import EntityStat from '../../models/domain/entity/EntityStat'

export default class EntityStatMapper {
  public static toDomain(doc: IEntityStat) {
    return new EntityStat(doc.statId, doc.baseValue, doc.buffs)
  }

  public static toDto(entityStat: EntityStat): IEntityStatDto {
    return {
      statId: entityStat.statId,
      baseValue: entityStat.baseValue,
      buffs: entityStat.buffs,
      currentValue: entityStat.currentValue
    }
  }
}
