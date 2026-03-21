import type { EntityStatId } from '@incursion/dto'

export default interface IItemModDefinition {
  itemModIndex: number
  name: string
  statId: EntityStatId
  isAdditive: boolean
}
