import type Ability from '../ability/Ability'
import type IEntityConfig from './IEntityConfig'

export default interface IAdversaryConfig extends IEntityConfig {
  abilities: Ability[]
}
