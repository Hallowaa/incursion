import type { IItemDto } from '@incursion/dto'
import Item from './Item'

export default class Inventory {
  public constructor(public items: Item[]) {}

  public static toDomain(doc: IItemDto[]) {
    return new Inventory(doc.map((item) => Item.toDomain(item)))
  }
}
