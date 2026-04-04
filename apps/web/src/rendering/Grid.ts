import { Color, Vector2, Vector3 } from 'three'
import Tile from './game-objects/Tile'
import GraphicObject from './GraphicObject'

export default class Grid extends GraphicObject {
  public tiles: GraphicObject[][] = []
  private tileSize = 170
  private floorSize = 175
  private tileDimensions = new Vector3(this.tileSize, 3, this.tileSize)

  public constructor(
    public width: number,
    public height: number
  ) {
    super()
  }

  public assemble(): GraphicObject {
    const objWidth = this.floorSize * this.width
    const objHeight = this.floorSize * this.height

    const tileColor = new Color(0x2E222F)
    for (let x = 0; x < this.width; x++) {
      const column: GraphicObject[] = []
      for (let y = 0; y < this.height; y++) {
        const tile = new Tile(this.tileDimensions, tileColor, new Vector2(x, y)).assemble()
        column.push(tile)

        this.add(tile)
        tile.position.set(
          (x * this.floorSize) - (objWidth / 2) + (this.floorSize / 2),
          1.5,
          (y * this.floorSize) - (objHeight / 2) + (this.floorSize / 2)
        )
      }
      this.tiles.push(column)
    }

    return this
  }

  public placeAt(obj: GraphicObject, pos: Vector2) {
    const position = this.gridToWorld(pos)
    obj.position.set(position.x, 50, position.z)
  }

  public gridToWorld(gridPos: Vector2) {
    return this.tiles[gridPos.x][gridPos.y].position
  }

  public tileAtWorldPos(worldPos: Vector3): Tile | undefined {
    const gridX = Math.floor((worldPos.x + this.floorSize * this.width / 2) / this.floorSize)
    const gridY = Math.floor((worldPos.z + this.floorSize * this.height / 2) / this.floorSize)

    if (gridX < 0 || gridX >= this.width || gridY < 0 || gridY >= this.height) return undefined

    return this.tiles[gridX][gridY] as Tile
  }
}
