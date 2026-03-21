import { ItemRarity } from "../enums/ItemRarity"
import { ItemType } from "../enums/ItemType"

export interface IItemDto {
  id: string
  name: string
  description: string
  type: ItemType
  rarity: ItemRarity
  levelRequirement: number
  stats: Record<string, number>
  imageUrl?: string
}