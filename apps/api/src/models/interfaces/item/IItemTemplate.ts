import type { ItemType } from '@incursion/dto'

export default interface IItemTemplate {
  itemIndex: number
  name: string
  description: string
  type: ItemType
  imageUrl?: string
  possibleModIndices: number[]
}
