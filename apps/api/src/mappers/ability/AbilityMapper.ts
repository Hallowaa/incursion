import type { IAbilityDto } from '@incursion/dto/src/ability/IAbilityDto'
import type Ability from '../../models/domain/ability/Ability'

export default class AbilityMapper {
  public static toDto(ability: Ability): IAbilityDto {
    return {
      abilityId: ability.abilityId,
      name: ability.name,
      description: ability.description,
      targetType: ability.targetType,
      elapsed: ability.elapsed,
      baseCooldown: ability.baseCooldown,
      baseRange: ability.baseRange,
      baseRadius: ability.baseRadius,
      baseCost: ability.baseCost,
      resourceType: ability.resourceType
    }
  }
}
