import { EntityKind } from "../enums/EntityKind"
import { IEntityStatDto } from "./IEntityStatDto"

export interface IEntityDto {
  kind: EntityKind
  entityId: string
  name: string
  stats: IEntityStatDto[]
}