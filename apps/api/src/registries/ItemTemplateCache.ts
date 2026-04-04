import type IItemTemplate from '../models/interfaces/item/IItemTemplate'
import { ItemTemplateModel } from '../models/schemas/item/ItemTemplateSchema'
import Log from '../util/Log'

const templateCache = new Map<number, IItemTemplate>()

export async function loadItemTemplateCache() {
  const docs = await ItemTemplateModel.find().lean()

  templateCache.clear()
  for (const doc of docs) {
    templateCache.set(doc.itemIndex, {
      itemIndex: doc.itemIndex,
      name: doc.name,
      description: doc.description,
      type: doc.type,
      imageUrl: doc.imageUrl ?? '',
      possibleModIndices: doc.possibleModIndices
    })
  }

  Log.i(`Loaded ${templateCache.size} item templates`)
}

export function getItemTemplate(itemIndex: number): IItemTemplate | undefined {
  return templateCache.get(itemIndex)
}

export default templateCache
