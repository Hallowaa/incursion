import type IItemModDefinition from '../models/interfaces/item/IItemModDefinition'
import { ItemModDefinitionModel } from '../models/schemas/item/ItemModDefinitionSchema'

const modRegistry = new Map<number, IItemModDefinition>()

export async function loadItemModRegistry() {
  const docs = await ItemModDefinitionModel.find().lean()

  modRegistry.clear()
  for (const doc of docs) {
    modRegistry.set(doc.itemModIndex, {
      itemModIndex: doc.itemModIndex,
      name: doc.name,
      statId: doc.statId,
      isAdditive: doc.isAdditive
    })
  }

  // eslint-disable-next-line no-console
  console.log(`Loaded ${modRegistry.size} item mod definitions`)
}

export function getItemModDefinition(modIndex: number): IItemModDefinition | undefined {
  return modRegistry.get(modIndex)
}

export default modRegistry
