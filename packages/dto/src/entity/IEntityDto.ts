import { IEntityStatDto } from "./IEntityStatDto"

export interface IEntityDto {
  entityId: string
  name: string
  stats: IEntityStatDto[]
}