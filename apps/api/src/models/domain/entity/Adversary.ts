import Ability from "../ability/Ability"
import Entity from "./Entity"
import IAdversaryConfig from "./IAdversaryConfig"

export default class Adversary extends Entity {
  public abilities: Ability[]
  public constructor(config: IAdversaryConfig) {
    super(config)
    this.abilities = structuredClone(config.abilities)
  }
}
