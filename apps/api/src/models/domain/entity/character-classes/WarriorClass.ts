import { CharacterClassId, EntityStatId } from "@incursion/dto";
import Ability from "../../ability/Ability";
import EntityStat from "../EntityStat";
import CharacterClass from "./CharacterClass";

export default class WarriorClass extends CharacterClass {
  public constructor() {
    const name = CharacterClassId.WARRIOR
    const stats = [
      new EntityStat(EntityStatId.DEXTERITY, 6, []),
      new EntityStat(EntityStatId.STRENGTH, 19, []),
      new EntityStat(EntityStatId.INTELLIGENCE, 1, [])
    ]
    const abilities: Ability[] = []
  
    super(name, stats, abilities)
  }
}