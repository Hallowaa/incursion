import type { IEntityStatBuffDto } from '@incursion/dto'
import type IEntityStatBuff from '../../models/interfaces/entity/IEntityStatBuff'
import EntityStatBuff from '../../models/domain/entity/EntityStatBuff'

export default class EntityStatBuffMapper {
  public static toDomain(doc: IEntityStatBuff): EntityStatBuff {
    return new EntityStatBuff(
      doc.name,
      doc.flatValue,
      doc.percentualValue,
      doc.isAdditive,
      doc.imageUrl
    )
  }

  public static toDto(buff: EntityStatBuff): IEntityStatBuffDto {
    return {
      name: buff.name,
      flatValue: buff.flatValue,
      percentualValue: buff.percentualValue,
      isAdditive: buff.isAdditive,
      imageUrl: buff.imageUrl
    }
  }

  public static toDb(buff: EntityStatBuff): IEntityStatBuff {
    return {
      name: buff.name,
      flatValue: buff.flatValue,
      percentualValue: buff.percentualValue,
      isAdditive: buff.isAdditive,
      imageUrl: buff.imageUrl
    }
  }
}
