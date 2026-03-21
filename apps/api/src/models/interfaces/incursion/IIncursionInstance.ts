import type { IncursionId, IncursionTheme } from '@incursion/dto'
import type IIncursionContext from './IIncursionContext'

export default interface IIncursionInstance {
  incursionId: IncursionId
  theme: IncursionTheme
  incursionContext: IIncursionContext
}
