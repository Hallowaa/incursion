import type IItemTemplate from '../../models/interfaces/item/IItemTemplate'
import { ItemType } from '@incursion/dto'

// indices 1000 - 1999
export const weapons: IItemTemplate[] = [
  {
    itemIndex: 1000,
    name: 'Dull Sword',
    description: 'A worn blade, still sharp enough to cut.',
    type: ItemType.MAIN_HAND,
    possibleModIndices: [1, 2]
  }
]
