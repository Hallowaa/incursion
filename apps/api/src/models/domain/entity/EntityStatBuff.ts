export default class EntityStatBuff {
  public constructor(
    public name: string,
    public flatValue: number,
    public percentualValue: number,
    public isAdditive: boolean,
    public imageUrl: string
  ) {}

  public static clone(buff: EntityStatBuff): EntityStatBuff {
    return new EntityStatBuff(
      buff.name,
      buff.flatValue,
      buff.percentualValue,
      buff.isAdditive,
      buff.imageUrl
    )
  }
}
