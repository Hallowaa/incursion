import type IItemTemplate from '../../models/interfaces/item/IItemTemplate'
import { ItemType } from '@incursion/dto'

// indices 0 - 999
export const armor: IItemTemplate[] = [
  {
    itemIndex: 0,
    name: 'Cloth Robe',
    description: 'A lightweight robe favored by apprentice mages.',
    type: ItemType.BODY,
    possibleModIndices: [3]
  }
]
