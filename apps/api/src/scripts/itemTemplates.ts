import * as dotenv from 'dotenv'

import mongoose from 'mongoose'
import { itemModDefinitions } from '../data/itemMods'
import { accessories } from '../data/items/accessories'
import { armor } from '../data/items/armor'
import { weapons } from '../data/items/weapons'
import { ItemModDefinitionModel } from '../models/schemas/item/ItemModDefinitionSchema'
import { ItemTemplateModel } from '../models/schemas/item/ItemTemplateSchema'
import Log from '../util/Log'

dotenv.config()

const allItemTemplates = [...weapons, ...armor, ...accessories]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!)
  Log.i('Connected to DB')

  for (const modDef of itemModDefinitions) {
    await ItemModDefinitionModel.findOneAndUpdate(
      { itemModIndex: modDef.itemModIndex },
      modDef,
      { upsert: true, new: true }
    )
    Log.i(`Seeded mod: ${modDef.name}`)
  }

  for (const template of allItemTemplates) {
    await ItemTemplateModel.findOneAndUpdate(
      { itemIndex: template.itemIndex },
      template,
      { upsert: true, new: true }
    )
    Log.i(`Seeded item: ${template.name}`)
  }

  await mongoose.disconnect()
  Log.i('Done')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
