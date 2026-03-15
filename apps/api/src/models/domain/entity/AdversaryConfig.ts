import { Ability, EntityConfig } from "../../../barrel";

export default interface AdversaryConfig extends EntityConfig {
  abilities: Ability[]
}
