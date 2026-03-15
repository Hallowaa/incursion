export default class Item {
  public constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly type: string,
    readonly rarity: string,
    readonly levelRequirement: number,
    readonly stats: Record<string, number>,
    readonly imageUrl?: string
  ) {}

  public static fromDb(doc: Item) {
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
