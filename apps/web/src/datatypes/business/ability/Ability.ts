import type { IAbilityDef, IActionAbilityContextDto } from '@incursion/dto'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import type Incursion from '../incursion/Incursion'
import type IAbilityConfig from './IAbilityConfig'
import type InputEventContext from '@/rendering/input/InputEventContext'

export default class Ability {
  public props: IAbilityDef
  public elapsed = 0
  public constructor(config: IAbilityConfig) {
    this.props = {
      abilityId: config.abilityId,
      name: config.name,
      description: config.description,
      targetType: config.targetType,
      baseCooldown: config.baseCooldown,
      baseCastTime: config.baseCastTime,
      baseRange: config.baseRange,
      baseRadius: config.baseRadius,
      baseCost: config.baseCost,
      resourceType: config.resourceType
    }
  }

  public effect(user: IncursionInstanceEntity, incursion: Incursion, context: InputEventContext): IActionAbilityContextDto | undefined {
    return undefined
  }

  public condition(user: IncursionInstanceEntity, incursion: Incursion, context: InputEventContext): boolean {
    return true
  }

  public canUse(user: IncursionInstanceEntity, incursion: Incursion, context: InputEventContext): boolean {
    return this.condition(user, incursion, context)
  }

  public execute(user: IncursionInstanceEntity, incursion: Incursion, context: InputEventContext): IActionAbilityContextDto | undefined {
    return this.effect(user, incursion, context)
  }
}
