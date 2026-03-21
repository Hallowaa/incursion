import type { IncursionId, IncursionTheme } from '@incursion/dto'
import type IncursionContext from './IncursionContext'

export default class Incursion {
  public constructor(
    public incursionId: IncursionId,
    public theme: IncursionTheme,
    public context: IncursionContext
  ) {}
}
