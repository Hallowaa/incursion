import type { AbilityId, AbilityResourceType, IActionAbilityContextDto, IDeltaDto, TargetType } from '@incursion/dto'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import type Incursion from '../incursion/Incursion'
import type Position from '../incursion/Position'
import type IAbilityConfig from './IAbilityConfig'

export default class Ability {
  public abilityId: AbilityId
  public name: string
  public description: string
  public targetType: TargetType
  public elapsed = 0
  public baseCooldown: number
  public baseCastTime: number
  public baseRange: number
  public baseRadius: Position
  public baseCost: number
  public resourceType: AbilityResourceType
  public effect: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionAbilityContextDto) => IDeltaDto | undefined
  public condition: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionAbilityContextDto) => boolean
  // Dont add a level to this, make it dependant on user level, it's more fun that way

  public constructor(config: IAbilityConfig) {
    this.abilityId = config.abilityId
    this.name = config.name
    this.description = config.description
    this.targetType = config.targetType
    this.baseCooldown = config.baseCooldown
    this.baseCastTime = config.baseCastTime
    this.baseRange = config.baseRange
    this.baseRadius = config.baseRadius
    this.baseCost = config.baseCost
    this.resourceType = config.resourceType
    this.effect = config.effect
    this.condition = config.condition
  }

  public canUse(user: IncursionInstanceEntity, incursion: Incursion, context: IActionAbilityContextDto): boolean {
    return this.condition(user, incursion, context)
  }

  public execute(user: IncursionInstanceEntity, incursion: Incursion, context: IActionAbilityContextDto): IDeltaDto | undefined {
    return this.effect(user, incursion, context)
  }
}
