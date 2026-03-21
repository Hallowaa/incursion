import type { IItemDto } from '@incursion/dto'
import type Item from '../../models/domain/item/Item'

export default class ItemMapper {
  public static toDto(item: Item): IItemDto {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.itemType,
      rarity: item.rarity,
      levelRequirement: 0,
      stats: {} // TODO: add stats
    }
  }

  /*
  public static toDomain(doc: IItem): Item {
    return new Item({
      id: doc.id,
      name: doc.name
    })
  }
  */
}
