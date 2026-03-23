import type { IncursionId } from '@incursion/dto'
import type IncursionRoom from './IncursionRoom'

export default class Incursion {
  public constructor(
    public incursionId: IncursionId,
    public name: string,
    public level: number,
    public currentRoom: IncursionRoom,
    public theme: string
  ) {}
}
