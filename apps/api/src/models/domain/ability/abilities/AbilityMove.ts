import type { IActionContextDto, IDeltaDto, IIIEPositionDeltaDto } from '@incursion/dto'
import type IncursionInstanceEntity from '../../entity/IncursionInstanceEntity'
import type Incursion from '../../incursion/Incursion'
import type IAbilityConfig from '../IAbilityConfig'
import { AbilityId, DeltaType, EntityStatId, TargetType } from '@incursion/dto'
import IncursionInstanceEntityMapper from '../../../../mappers/entity/IncursionInstanceEntityMapper'
import PositionMapper from '../../../../mappers/incursion/PositionMapper'
import Position from '../../incursion/Position'
import Ability from '../Ability'

export default class AbilityMove extends Ability {
  public constructor() {
    const config: IAbilityConfig = {
      abilityId: AbilityId.MOVE,
      name: 'MOVE',
      description: 'Move to any tile in range',
      targetType: TargetType.SELF,
      cooldown: function (user: IncursionInstanceEntity): number {
        const movementSpeed = user.entity.stats.find((s) => s.statId === EntityStatId.MOVEMENT_SPEED)

        if (!movementSpeed) {
          return 1000
        }

        const result = 2000 - movementSpeed.currentValue * 1000
        return result
      },
      effect: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto): IDeltaDto | undefined => {
        if (!context.targetPosition) {
          return
        }

        if (!this.isInBounds(user.position, new Position(0, incursion.currentRoom.width - 1), new Position(0, incursion.currentRoom.height - 1))) {
          return
        }

        // TODO: make range into a stat
        if (!this.isInRange(user.position, context.targetPosition, 1)) {
          return
        }

        const newPos = new Position(context.targetPosition.x, context.targetPosition.y)

        const positionDelta: IIIEPositionDeltaDto = {
          deltaType: DeltaType.POSITION,
          iie: IncursionInstanceEntityMapper.toDto(user),
          position: PositionMapper.toDto(newPos)
        }

        return positionDelta
      },
      condition: function (): boolean {
        return true
      }
    }

    super(config)
  }

  public isInBounds(pos: Position, boundsX: Position, boundsY: Position) {
    return pos.x >= boundsX.x && pos.x <= boundsX.y && pos.y >= boundsY.x && pos.y <= boundsX.y
  }

  public isInRange(startPos: Position, endPos: Position, range: number) {
    const dx = endPos.x - startPos.x
    const dy = endPos.y - startPos.y
    return Math.abs(dx) <= range && Math.abs(dy) <= range
  }
}
