import type { ItemRarity, ItemType } from '@incursion/dto'
import type IItemConfig from './IItemConfig'

export default class Item {
  public id: string
  public name: string
  public description: string
  public itemType: ItemType
  public rarity: ItemRarity
  public constructor(config: IItemConfig) {
    this.id = config.id
    this.name = config.name
    this.description = config.description
    this.itemType = config.itemType
    this.rarity = config.rarity
  }
}
