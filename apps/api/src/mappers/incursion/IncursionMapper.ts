import type Incursion from '../../models/domain/incursion/Incursion'
import type IIncursionInstance from '../../models/interfaces/incursion/IIncursionInstance'

export default class IncursionMapper {
  public static toDb(incursion: Incursion): IIncursionInstance {
    console.log(incursion)
    return {
      incursionId: incursion.incursionId,
      theme: incursion.theme,
      incursionContext: {
        name: incursion.context.name,
        level: incursion.context.level,
        rooms: []
      }
    }
  }
}
