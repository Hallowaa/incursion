import type { IEntityStatBuffDto } from '@incursion/dto'

export default class EntityStatBuff {
  public constructor(
    public name: string,
    public flatValue: number,
    public percentualValue: number,
    public isAdditive: boolean,
    public imageUrl?: string
  ) {}

  public static toDomain(doc: IEntityStatBuffDto) {
    return new EntityStatBuff(
      doc.name,
      doc.flatValue,
      doc.percentualValue,
      doc.isAdditive,
      doc.imageUrl
    )
  }
}
