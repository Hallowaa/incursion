import Character from "../models/domain/entity/Character"
import Entity from "../models/domain/entity/Entity"
import EntityStat from "../models/domain/entity/EntityStat"
import { AdversaryId } from "@incursion/dto/src/enums/AdversaryId"
import { EntitystatId } from "@incursion/dto/src/enums/EntityStatId"
import { IncursionRoomType } from "@incursion/dto/src/enums/IncursionRoomType"
import Incursion from "../models/domain/incursion/Incursion"
import IncursionContext from "../models/domain/incursion/IncursionContext"
import IncursionRoom from "../models/domain/incursion/IncursionRoom"
import IIncursionTemplate from "../models/interfaces/incursion/IIncursionTemplate"

// The doc sent to the database is created by the mapper!
export default class IncursionGenerator {
  public static generateIncursion(
    template: IIncursionTemplate,
    character: Character,
  ) {
    const context: IncursionContext = {
      name: template.name,
      level: character.experience,
      rooms: [
        new IncursionRoom(IncursionRoomType.FIGHT, [
          new Entity({
            entityId: AdversaryId.GHOUL,
            name: 'Ghoul',
            stats: [new EntityStat(EntitystatId.HEALTH, 15, [])],
          }),
        ]),
      ],
    }
    return new Incursion(template.incursionId, template.theme, context)
  }
}
