import { Ability, AdversaryConfig, Entity } from "../../../barrel"


export default class Adversary extends Entity {
  public abilities: Ability[]
  public constructor(config: AdversaryConfig) {
    super(config)
    this.abilities = structuredClone(config.abilities)
  }
}
