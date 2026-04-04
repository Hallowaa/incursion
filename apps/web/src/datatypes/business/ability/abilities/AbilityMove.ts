import type Entity from '../../entity/Entity'
import type IAbilityConfig from '../IAbilityConfig'
import { EntityStatId } from '@incursion/dto'
import Ability from '../Ability'

export default class AbilityMove extends Ability {
  public constructor(config: IAbilityConfig) {
    super(config)
  }

  public computeCooldown(user: Entity): number {
    const movementSpeed = user.stats.find((s) => s.statId === EntityStatId.MOVEMENT_SPEED)

    if (!movementSpeed) {
      return 1000
    }

    const result = 2000 - movementSpeed.currentValue * 1000

    return result
  }
}
