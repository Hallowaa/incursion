import type { IAbilityDto } from 'node_modules/@incursion/dto/src/ability/IAbilityDto'
import type IAbilityConfig from '@/datatypes/business/ability/IAbilityConfig'
import { AbilityId } from '@incursion/dto'
import AbilityMove from '@/datatypes/business/ability/abilities/AbilityMove'
import NotificationManager from '@/managers/NotificationManager'

export default class AbilityMapper {
  public static toDomain(dto: IAbilityDto) {
    switch (dto.abilityId) {
      case AbilityId.MOVE: {
        return new AbilityMove(this.dtoToConfig(dto))
      }
      case AbilityId.SWIFT_STRIKE: {
        NotificationManager.error(`Ability ${dto.abilityId} not yet implemented`)
        throw new Error(`Ability ${dto.abilityId} not yet implemented`)
      }
    }
  }

  private static dtoToConfig(dto: IAbilityDto): IAbilityConfig {
    return {
      abilityId: dto.abilityId,
      name: dto.name,
      description: dto.description,
      targetType: dto.targetType,
      baseCooldown: dto.baseCooldown,
      baseCastTime: dto.baseCastTime,
      baseRange: dto.baseRange,
      baseRadius: dto.baseRadius,
      baseCost: dto.baseCost,
      resourceType: dto.resourceType
    }
  }
}
