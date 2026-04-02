export default class Position {
  public constructor(
    public x: number,
    public y: number
  ) {}

  public static clone(pos: Position): Position {
    return new Position(pos.x, pos.y)
  }
}
