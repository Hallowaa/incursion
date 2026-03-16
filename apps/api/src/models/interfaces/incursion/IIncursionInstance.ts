import { IncursionId } from "../../domain/enums/IncursionId"
import { IncursionTheme } from "../../domain/enums/IncursionTheme"
import IIncursionContext from "./IIncursionContext"

export default interface IIncursionInstance {
  incursionId: IncursionId
  theme: IncursionTheme
  incursionContext: IIncursionContext
}
