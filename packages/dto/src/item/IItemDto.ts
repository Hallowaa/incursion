import { EquipmentType } from "../enums/EquipmentType"

export interface IItemDto {
  id: string
  name: string
  description: string
  type: EquipmentType
  rarity: string
  levelRequirement: number
  stats: Record<string, number>
  imageUrl?: string
}