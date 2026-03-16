import CharacterClass from "./CharacterClass"
import IEntityConfig from "./IEntityConfig"


export default interface ICharacterConfig extends IEntityConfig {
  experience: number
  classes: CharacterClass[]
}
