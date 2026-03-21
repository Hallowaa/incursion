import type Item from '../item/Item'

export default class Inventory {
  public items: Item[]

  public constructor(items: Item[]) {
    this.items = structuredClone(items)
  }
}
