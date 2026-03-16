import type Character from './entity/Character'

export default class User {
  public constructor(
    readonly username: string,
    readonly createdAt: number,
    readonly character: Character
  ) {}
}
