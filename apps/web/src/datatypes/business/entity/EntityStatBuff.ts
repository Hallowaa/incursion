export default class EntityStatBuff {
  public constructor(
    public name: string,
    public flatValue: number,
    public percentualValue: number,
    public isAdditive: boolean,
    public imageUrl?: string
  ) {}

  public static fromDb(doc: EntityStatBuff) {
    return new EntityStatBuff(
      doc.name,
      doc.flatValue,
      doc.percentualValue,
      doc.isAdditive,
      doc.imageUrl
    )
  }
}
