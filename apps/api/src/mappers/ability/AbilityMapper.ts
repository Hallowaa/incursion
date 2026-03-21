import type { IAbilityDto } from '@incursion/dto/src/ability/IAbilityDto'
import type Ability from '../../models/domain/ability/Ability'
import { AbilityId } from '@incursion/dto'
import AbilitySwiftStrike from '../../models/domain/ability/abilities/AbilitySwiftStrike'

export default class AbilityMapper {
  public static toDomain(abilityId: AbilityId) {
    // TODO: make work for all abilities
    switch (abilityId) {
      case AbilityId.SWIFT_STRIKE: {
        return new AbilitySwiftStrike()
      }
    }
  }

  public static toDto(ability: Ability): IAbilityDto {
    return {} // TODO: implement
  }
}
