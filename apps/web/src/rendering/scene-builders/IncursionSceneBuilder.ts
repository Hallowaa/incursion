import type GraphicObject from '../GraphicObject'
import type Renderer from '../Renderer'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import { AmbientLight, Color, DirectionalLight, Vector3 } from 'three'
import OpaqueCuboid from '../shapes/OpaqueCuboid'
import TransparentCuboid from '../shapes/TransparentCuboid'
import SceneBuilder from './SceneBuilder'

export default class IncursionSceneBuilder extends SceneBuilder {
  private FLOOR_HEIGHT = 800
  private grid: GraphicObject[][] = []
  private tileSize = 145
  private floorSize = 150
  private tileDimensions = new Vector3(this.tileSize, 3, this.tileSize)

  public constructor(renderer: Renderer, public incursion: Incursion) {
    super(renderer)
  }

  public buildScene(): void {
    // LIGHTING
    const ambient = new AmbientLight(0xFFD861, 1)
    this.scene.add(ambient)
    const directional = new DirectionalLight(0xFFD861, 2)
    directional.position.set(20, 50, 0)
    this.scene.add(directional)

    // FLOOR
    const floorWidth = this.floorSize * this.incursion.currentRoom.width
    const floorDepth = this.floorSize * this.incursion.currentRoom.height
    const cuboid = new TransparentCuboid(
      new Vector3(floorWidth, this.FLOOR_HEIGHT, floorDepth),
      new Color(0xFFFFFF)
    )
    this.scene.add(cuboid.assemble())
    cuboid.position.set(0, -this.FLOOR_HEIGHT / 2, 0)

    // TILES
    const tileColor = new Color(0xFF0000)
    for (let x = 0; x < this.incursion.currentRoom.width; x++) {
      const column: GraphicObject[] = []
      for (let y = 0; y < this.incursion.currentRoom.height; y++) {
        const tile = new OpaqueCuboid(this.tileDimensions, tileColor).assemble()
        column.push(tile)

        this.scene.add(tile)
        tile.position.set(
          (x * this.floorSize) - (floorWidth / 2) + (this.floorSize / 2),
          1.5,
          (y * this.floorSize) - (floorDepth / 2) + (this.floorSize / 2)
        )
      }
      this.grid.push(column)
    }
  }

  public animateScene(time: number): void {
  }
}
