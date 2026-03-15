import { CharacterClass, EntityConfig } from "../../../barrel"

export default interface CharacterConfig extends EntityConfig {
  experience: number
  classes: CharacterClass[]
}
