import type { AbilityId, IActionContextDto, IDeltaDto, TargetType } from '@incursion/dto'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import type Incursion from '../incursion/Incursion'
import type IAbilityConfig from './IAbilityConfig'

// DOES NOT need conversion, as the mapper does that
export default class Ability {
  public abilityId: AbilityId
  public name: string
  public description: string
  public targetType: TargetType
  public cooldown: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto) => number
  public effect: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto) => IDeltaDto | undefined
  public condition: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto) => boolean

  public constructor(config: IAbilityConfig) {
    this.abilityId = config.abilityId
    this.name = config.name
    this.description = config.description
    this.targetType = config.targetType
    this.cooldown = config.cooldown
    this.effect = config.effect
    this.condition = config.condition
  }

  public canUse(user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto): boolean {
    return this.condition(user, incursion, context)
  }

  public execute(user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto): IDeltaDto | undefined {
    return this.effect(user, incursion, context)
  }
}
