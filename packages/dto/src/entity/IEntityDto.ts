import { EntityKind } from "../enums/EntityKind"
import { IEntityStatDto } from "./IEntityStatDto"

export interface IEntityDto {
  _id: string
  kind: EntityKind
  name: string
  stats: IEntityStatDto[]
}