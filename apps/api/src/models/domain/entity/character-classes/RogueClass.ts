import { CharacterClassId, EntityStatId } from "@incursion/dto";
import Ability from "../../ability/Ability";
import EntityStat from "../EntityStat";
import CharacterClass from "./CharacterClass";

export default class RogueClass extends CharacterClass {
  public constructor() {
    const name = CharacterClassId.ROGUE
    const stats = [
      new EntityStat(EntityStatId.DEXTERITY, 13, []),
      new EntityStat(EntityStatId.STRENGTH, 9, []),
      new EntityStat(EntityStatId.INTELLIGENCE, 4, [])
    ]
    const abilities: Ability[] = []
  
    super(name, stats, abilities)
  }
}