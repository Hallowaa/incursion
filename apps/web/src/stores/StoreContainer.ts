import type { useCharacterStore } from './CharacterStore'
import type { useIncursionStore } from './IncursionStore'
import type { useUIStore } from './UIStore'

export default interface StoreContainer {
  characterStore: ReturnType<typeof useCharacterStore>
  incursionStore: ReturnType<typeof useIncursionStore>
  uiStore: ReturnType<typeof useUIStore>
}
