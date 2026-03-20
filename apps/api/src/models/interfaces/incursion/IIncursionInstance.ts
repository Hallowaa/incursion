import { IncursionId } from "@incursion/dto/src/enums/IncursionId"
import { IncursionTheme } from "@incursion/dto/src/enums/IncursionTheme"
import IIncursionContext from "./IIncursionContext"

export default interface IIncursionInstance {
  incursionId: IncursionId
  theme: IncursionTheme
  incursionContext: IIncursionContext
}
