import type { IPassivePointsSpentDto } from '@incursion/dto'

export default class PassivePointsSpent {
  public constructor(
    public name: string,
    public value: number
  ) {}

  public static toDomain(doc: IPassivePointsSpentDto) {
    return new PassivePointsSpent(doc.name, doc.value)
  }
}
