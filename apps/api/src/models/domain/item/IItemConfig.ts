import type { ItemRarity, ItemType } from '@incursion/dto'

export default interface IItemConfig {
  id: string
  name: string
  description: string
  itemType: ItemType
  rarity: ItemRarity
  levelRequirement: number
  // TODO: add stats
}
