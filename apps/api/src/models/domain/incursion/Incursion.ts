import IIncursionInstance from "../../interfaces/incursion/IIncursionInstance"
import { IncursionId } from "@incursion/dto/src/enums/IncursionId"
import { IncursionTheme } from "@incursion/dto/src/enums/IncursionTheme"
import IncursionContext from "./IncursionContext"


export default class Incursion {
  public constructor(
    public incursionId: IncursionId,
    public theme: IncursionTheme,
    public context: IncursionContext,
  ) {}

  public static toDb(incursion: Incursion): IIncursionInstance {
    console.log(incursion)
    return {
      incursionId: incursion.incursionId,
      theme: incursion.theme,
      incursionContext: {
        name: incursion.context.name,
        level: incursion.context.level,
        rooms: [],
      },
    }
  }
}
