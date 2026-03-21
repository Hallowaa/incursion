import type { IEntityStatBuffDto } from '@incursion/dto'
import type EntityStatBuff from '../../models/domain/entity/EntityStatBuff'

export default class EntityStatBuffMapper {
  public static toDto(buff: EntityStatBuff): IEntityStatBuffDto {
    return {
      name: buff.name,
      flatValue: buff.flatValue,
      percentualValue: buff.percentualValue,
      isAdditive: buff.isAdditive,
      imageUrl: buff.imageUrl
    }
  }
}
