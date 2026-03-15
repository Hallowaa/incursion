import { IEntityStat } from "../../../barrel"

export default interface ICharacterClass {
  name: string
  stats: IEntityStat[]
  abilities: string[]
}
