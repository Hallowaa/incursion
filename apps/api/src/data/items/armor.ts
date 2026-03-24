import type IItemTemplate from '../../models/interfaces/item/IItemTemplate'
import { ItemType, ModIndex } from '@incursion/dto'

// indices 0 - 999
export const armor: IItemTemplate[] = [
  {
    itemIndex: 0,
    name: 'Cloth Robe',
    description: 'Sometimes, the price of fashion is inconvenience.',
    type: ItemType.BODY,
    possibleModIndices: [
      ModIndex.HEALTH_FLAT
    ]
  }
]
