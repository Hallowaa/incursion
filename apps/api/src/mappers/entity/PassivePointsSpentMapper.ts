import type { IPassivePointsSpentDto } from '@incursion/dto'
import type IPassivePointsSpent from '../../models/interfaces/entity/IPassivePointsSpent'

export default class PassivePointsSpentMapper {
  public static toDto(doc: IPassivePointsSpent): IPassivePointsSpentDto {
    return {
      name: doc.name,
      value: doc.value
    }
  }
}
