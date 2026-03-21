import { IAbilityDto } from "../ability/IAbilityDto";
import { CharacterClassId } from "../enums/CharacterClassId";
import { IEntityStatDto } from "./IEntityStatDto";

export interface ICharacterClassDto {
  name: CharacterClassId
  stats: IEntityStatDto[]
  abilities: IAbilityDto[]
  // hide advancements
  description: string
}