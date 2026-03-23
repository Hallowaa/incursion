export default class EntityStatBuff {
  public constructor(
    public name: string,
    public flatValue: number,
    public percentualValue: number,
    public isAdditive: boolean,
    public imageUrl?: string
  ) {}
}
