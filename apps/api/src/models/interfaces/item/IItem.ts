import type { IItemMod } from './IItemMod'

// Used for translating between doc and domain object
export default interface IItem {
  id: string
  itemIndex: number
  createdAt: Date
  levelRequirement: number
  itemMods: IItemMod[]
  rarity: string
}
