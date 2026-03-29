import type { IPositionDto } from '@incursion/dto'
import Position from '@/datatypes/business/incursion/Position'

export default class PositionMapper {
  public static toDomain(dto: IPositionDto): Position {
    return new Position(dto.x, dto.y)
  }

  public static toDto(position: Position): IPositionDto {
    return {
      x: position.x,
      y: position.y
    }
  }
}
