import type { IItemDto, ItemType } from '@incursion/dto'

export default class Item {
  public constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly type: ItemType,
    readonly rarity: string,
    readonly levelRequirement: number,
    readonly stats: Record<string, number>,
    readonly imageUrl?: string
  ) {}

  public static toDomain(doc: IItemDto) {
    return new Item(
      doc.id,
      doc.name,
      doc.description,
      doc.type,
      doc.rarity,
      doc.levelRequirement,
      doc.stats,
      doc.imageUrl
    )
  }
}
