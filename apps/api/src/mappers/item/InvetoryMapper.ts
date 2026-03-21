import type { IItemDto } from '@incursion/dto'
import type IItem from '../../models/interfaces/item/IItem'
import Inventory from '../../models/domain/entity/Inventory'
import ItemMapper from './ItemMapper'

export default class InventoryMapper {
  public static toDto(inventory: Inventory): IItemDto[] {
    return inventory.items.map((i) => ItemMapper.toDto(i))
  }

  public static toDomain(doc: IItem[]): Inventory {
    return new Inventory([]) // TODO: implement
  }
}
