import type IIncursionTemplate from '../models/interfaces/incursion/IIncursionTemplate'
import { AdversaryTag, IncursionName, IncursionRoomType, IncursionTheme } from '@incursion/dto'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { IncursionTemplateModel } from '../models/schemas/incursion/IncursionTemplateSchema'
import Log from '../util/Log'

dotenv.config()

export const incursionTemplates: IIncursionTemplate[] = [
  {
    incursionId: 'forgotten_field_template',
    name: IncursionName.FORGOTTEN_FIELD,
    theme: IncursionTheme.FIELD,
    minLevel: 0,
    maxLevel: 10,
    roomCountRange: [3, 6],
    guaranteedRooms: [IncursionRoomType.ENTRANCE, IncursionRoomType.BOSS],
    possibleRooms: [
      {
        type: IncursionRoomType.FIGHT,
        weight: 60
      },
      {
        type: IncursionRoomType.TREASURE,
        weight: 15
      }
    ],
    adversaryTags: [AdversaryTag.HUMANOID]
  }
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!)
  Log.i('Connected to DB')

  for (const template of incursionTemplates) {
    await IncursionTemplateModel.findOneAndUpdate(
      { incursionId: template.incursionId },
      template,
      {
        upsert: true,
        new: true
      }
    )
    Log.i(`Seeded: ${template.name}`)
  }

  await mongoose.disconnect()
  Log.i('Done')
}

seed().catch((err) => {
  Log.e(`${err}`)
  process.exit(1)
})
