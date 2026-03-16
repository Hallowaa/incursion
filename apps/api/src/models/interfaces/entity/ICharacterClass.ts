import IEntityStat from "./IEntityStat"

export default interface ICharacterClass {
  name: string
  stats: IEntityStat[]
  abilities: string[]
}
