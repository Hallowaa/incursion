import Ability from "../ability/Ability"
import IEntityConfig from "./IEntityConfig"


export default interface IAdversaryConfig extends IEntityConfig {
  abilities: Ability[]
}
