import IIncursionTemplate from "../models/interfaces/incursion/IIncursionTemplate"


export default class IncursionTemplateMapper {
  public static toDomain(doc: IIncursionTemplate): IIncursionTemplate {
    return {
      incursionId: doc.incursionId,
      name: doc.name,
      theme: doc.theme,
      minLevel: doc.minLevel,
      maxLevel: doc.maxLevel,
      roomCountRange: doc.roomCountRange,
      guaranteedRooms: doc.guaranteedRooms,
      possibleRooms: doc.possibleRooms,
      adversaryTags: doc.adversaryTags,
    }
  }
}
