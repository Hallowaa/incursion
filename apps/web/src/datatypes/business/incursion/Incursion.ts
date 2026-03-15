import type { IIncursionContext } from '@/barrel'

export default class Incursion {
  public constructor(
    public theme: string,
    public context: IIncursionContext
  ) {}

  public static fromDb(incursion: Incursion): Incursion {
    return new Incursion(incursion.theme, incursion.context)
  }
}
