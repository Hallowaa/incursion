import type IItemModDefinition from '../models/interfaces/item/IItemModDefinition'
import { EntityStatId } from '@incursion/dto'

export const itemModDefinitions: IItemModDefinition[] = [
  {
    itemModIndex: 1,
    name: 'Strength',
    statId: EntityStatId.STRENGTH,
    isAdditive: true
  },
  {
    itemModIndex: 2,
    name: 'Dexterity',
    statId: EntityStatId.DEXTERITY,
    isAdditive: true
  },
  {
    itemModIndex: 3,
    name: 'Intelligence',
    statId: EntityStatId.INTELLIGENCE,
    isAdditive: true
  }
]
