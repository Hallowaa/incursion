import { ActionType } from "../../enums/ActionType"

export interface IActionContextDto {
  timestamp: number
  actionType: ActionType
}