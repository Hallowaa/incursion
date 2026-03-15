import type { Character } from '@/barrel'

export default class User {
  public constructor(
    readonly username: string,
    readonly createdAt: number,
    readonly character: Character
  ) {}
}
