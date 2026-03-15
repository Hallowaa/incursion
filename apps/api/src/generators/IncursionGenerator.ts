import { AdversaryId, Character, Entity, EntityStat, EntitystatId, IIncursionTemplate, Incursion, IncursionContext, IncursionRoom, IncursionRoomType } from "../barrel"

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
