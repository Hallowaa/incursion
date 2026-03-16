import Ability from "../models/domain/ability/Ability"
import { AbilityId } from "../models/domain/enums/AbilityId"
import { TargetType } from "../models/domain/enums/TargetType"

export default class AbilityMapper {
  public static toDomain(abilityName: string) {
    // TODO: make work for all abilities
    return new Ability({
      abilityId: AbilityId.STAB,
      name: 'Stab',
      cooldown: 0,
      targetType: TargetType.OTHER,
      effect: (user, context) => {},
      condition: (user, context) => {
        return true
      },
    })
  }
}
