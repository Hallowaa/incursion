import { IIncursionContext, IncursionId, IncursionTheme } from "../../../barrel"


export default interface IIncursionInstance {
  incursionId: IncursionId
  theme: IncursionTheme
  incursionContext: IIncursionContext
}
