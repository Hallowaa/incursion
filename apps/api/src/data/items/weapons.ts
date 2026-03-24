import type IItemTemplate from '../../models/interfaces/item/IItemTemplate'
import { ItemType, ModIndex } from '@incursion/dto'

// indices 1000 - 1999
export const weapons: IItemTemplate[] = [
  {
    itemIndex: 1000,
    name: 'Dull Sword',
    description: 'I strike, and strike, AND STRIKE! But nothing happens...',
    type: ItemType.MAIN_HAND,
    possibleModIndices: [
      ModIndex.STRENGTH_FLAT,
      ModIndex.DEXTERITY_FLAT
    ]
  }
]
