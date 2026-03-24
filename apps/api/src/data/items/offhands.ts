import type IItemTemplate from '../../models/interfaces/item/IItemTemplate'
import { ItemType, ModIndex } from '@incursion/dto'

// indices 2000 - 2999
export const offhands: IItemTemplate[] = [
  {
    itemIndex: 2000,
    name: 'Wooden Shield',
    description: 'Planks, nails, and dreams.',
    type: ItemType.OFF_HAND,
    possibleModIndices: [
      ModIndex.STRENGTH_FLAT
    ]
  }
]
