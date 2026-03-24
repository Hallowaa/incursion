import type { IPositionDto } from '@incursion/dto'
import Position from '@/datatypes/business/incursion/Position'

export default class PositionMapper {
  public static toDomain(doc: IPositionDto | undefined): Position | undefined {
    if (!doc) {
      return
    }

    return new Position(doc.x, doc.y)
  }

  public static toDto(position: Position): IPositionDto {
    return {
      x: position.x,
      y: position.y
    }
  }
}
