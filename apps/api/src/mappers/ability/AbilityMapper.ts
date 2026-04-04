import type { IAbilityDto } from '@incursion/dto/src/ability/IAbilityDto'
import type Ability from '../../models/domain/ability/Ability'

export default class AbilityMapper {
  public static toDto(ability: Ability): IAbilityDto {
    return {
      abilityId: ability.props.abilityId,
      name: ability.props.name,
      description: ability.props.description,
      targetType: ability.props.targetType,
      elapsed: ability.elapsed,
      baseCooldown: ability.props.baseCooldown,
      baseCastTime: ability.props.baseCastTime,
      baseRange: ability.props.baseRange,
      baseRadius: ability.props.baseRadius,
      baseCost: ability.props.baseCost,
      resourceType: ability.props.resourceType
    }
  }
}
