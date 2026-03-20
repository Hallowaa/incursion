import { AbilityId, TargetType } from "@incursion/dto"
import Entity from "../entity/Entity"
import IncursionContext from "../incursion/IncursionContext"
import IAbilityConfig from "./IAbilityConfig"


// DOES NOT need conversion, as the mapper does that
export default class Ability {
  public abilityId: AbilityId
  public name: string
  public cooldown: number
  public targetType: TargetType
  public effect: (user: Entity, context: IncursionContext) => void
  public condition: (user: Entity, context: IncursionContext) => boolean

  public constructor(config: IAbilityConfig) {
    this.abilityId = config.abilityId
    this.name = config.name
    this.cooldown = config.cooldown
    this.targetType = config.targetType
    this.effect = config.effect
    this.condition = config.condition
  }

  public canUse(user: Entity, context: IncursionContext): boolean {
    if (this.condition(user, context) === true) {
      return true
    }

    return false
  }

  public execute(user: Entity, context: IncursionContext): void {
    this.effect(user, context)
  }
}
