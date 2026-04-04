import type Character from '../models/domain/entity/Character'
import CharacterMapper from '../mappers/entity/CharacterMapper'
import { CharacterModel } from '../models/schemas/entity/CharacterSchema'
import Log from '../util/Log'

export default class CharacterManager {
  private characters: Map<string, Character> = new Map()

  public async load(userId: string): Promise<Character | null> {
    const doc = await CharacterModel.findOne({ owner: userId }).lean()
    if (!doc) return null

    const character = CharacterMapper.toDomain(doc)
    this.characters.set(userId, character)
    return character
  }

  public get(userId: string): Character | undefined {
    return this.characters.get(userId)
  }

  public evict(userId: string): void {
    this.characters.delete(userId)
  }
}
