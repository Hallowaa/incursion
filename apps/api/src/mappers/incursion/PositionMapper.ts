import type { IPositionDto } from '@incursion/dto'
import type IPosition from '../../models/interfaces/incursion/IPosition'
import Position from '../../models/domain/incursion/Position'

export default class PositionMapper {
  public static toDomain(doc: IPosition): Position {
    return new Position(doc.x, doc.y)
  }

  public static toDto(position: Position): IPositionDto {
    return {
      x: position.x,
      y: position.y
    }
  }

  public static toDb(position: Position): IPosition {
    return {
      x: position.x,
      y: position.y
    }
  }
}
