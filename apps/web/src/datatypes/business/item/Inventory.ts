import { Item } from '@/barrel'

export default class Inventory {
  public constructor(public items: Item[]) {}

  public static fromDb(doc: Inventory) {
    return new Inventory(doc.items.map((item) => Item.fromDb(item)))
  }
}
