import { CharacterClassId, EntityStatId } from "@incursion/dto";
import Ability from "../../ability/Ability";
import EntityStat from "../EntityStat";
import CharacterClass from "./CharacterClass";

export default class MageClass extends CharacterClass {
  public constructor() {
    const name = CharacterClassId.MAGE
    const stats = [
      new EntityStat(EntityStatId.DEXTERITY, 4, []),
      new EntityStat(EntityStatId.STRENGTH, 2, []),
      new EntityStat(EntityStatId.INTELLIGENCE, 20, [])
    ]
    const abilities: Ability[] = []

    super(name, stats, abilities)
  }
}