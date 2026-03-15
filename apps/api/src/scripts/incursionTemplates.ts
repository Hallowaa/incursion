import * as dotenv from 'dotenv'
dotenv.config()

import { AdversaryTag } from '../models/domain/enums/AdversaryTag'
import { IncursionId } from '../models/domain/enums/IncursionId'
import { IncursionRoomType } from '../models/domain/enums/IncursionRoomType'
import { IncursionTheme } from '../models/domain/enums/IncursionTheme'
import mongoose from 'mongoose'
import { IncursionTemplateModel } from '../models/schemas/incursion/IncursionTemplateSchema'
import { IIncursionTemplate } from '../models/interfaces/incursion/IIncursionTemplate'

export const incursionTemplates: IIncursionTemplate[] = [
  {
    incursionId: IncursionId.FORGOTTEN_FIELD,
    name: 'Forgotten field',
    theme: IncursionTheme.FIELD,
    minLevel: 0,
    maxLevel: 10,
    roomCountRange: [3, 6],
    guaranteedRooms: [IncursionRoomType.ENTRANCE, IncursionRoomType.BOSS],
    possibleRooms: [
      {
        type: IncursionRoomType.FIGHT,
        weight: 60,
      },
      {
        type: IncursionRoomType.TREASURE,
        weight: 15,
      },
    ],
    adversaryTags: [AdversaryTag.HUMANOID],
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!)
  console.log('Connected to DB')

  for (const template of incursionTemplates) {
    await IncursionTemplateModel.findOneAndUpdate(
      { incursionId: template.incursionId },
      template,
      {
        upsert: true,
        new: true,
      },
    )
    console.log(`Seeded: ${template.name}`)
  }

  await mongoose.disconnect()
  console.log('Done')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
