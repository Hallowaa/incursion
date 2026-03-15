export default class PassivePointsSpent {
  public constructor(
    public name: string,
    public value: number
  ) {}

  public static fromDb(doc: PassivePointsSpent) {
    return new PassivePointsSpent(doc.name, doc.value)
  }
}
