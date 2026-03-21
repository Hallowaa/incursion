import type IItemTemplate from '../../models/interfaces/item/IItemTemplate'
import { ItemType } from '@incursion/dto'

// indices 2000 - 2999
export const offhands: IItemTemplate[] = [
  {
    itemIndex: 2000,
    name: 'Wooden Shield',
    description: 'A shield made of planks.',
    type: ItemType.OFF_HAND,
    possibleModIndices: [1]
  }
]
