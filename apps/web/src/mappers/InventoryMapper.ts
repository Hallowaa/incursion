import type { IItemDto } from '@incursion/dto'
import Inventory from '@/datatypes/business/item/Inventory'

export default class InventoryMapper {
  public static toDomain(dto: IItemDto[]) {
    return new Inventory([]) // TODO: yeah
  }
}
