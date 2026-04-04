import type { IncursionName } from '@incursion/dto'
import type IncursionRoom from './IncursionRoom'

export default class Incursion {
  public constructor(
    public incursionId: string,
    public name: IncursionName,
    public level: number,
    public currentRoom: IncursionRoom,
    public theme: string
  ) {}
}
