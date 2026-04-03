import type Tile from '../game-objects/Tile'
import type InputEventContext from '../input/InputEventContext'
import type Renderer from '../Renderer'
import type Character from '@/datatypes/business/entity/Character'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import { AmbientLight, Color, DirectionalLight, Vector2, Vector3 } from 'three'
import CharacterModel from '../game-objects/character-models.ts/CharacterModel'
import EntityModel from '../game-objects/character-models.ts/EntityModel'
import Grid from '../Grid'
import TransparentCuboid from '../shapes/TransparentCuboid'
import SceneBuilder from './SceneBuilder'

export default class IncursionSceneBuilder extends SceneBuilder {
  public grid: Grid

  private FLOOR_HEIGHT = 800
  private floorSize = 150

  private lastTiles: Set<Tile> = new Set()
  private selectionRange = 1

  public constructor(renderer: Renderer, public incursion: Incursion) {
    super(renderer)
    this.grid = new Grid(
      incursion.currentRoom.width,
      incursion.currentRoom.height
    )
  }

  public buildScene(): void {
    // LIGHTING
    const ambient = new AmbientLight(0xFFFFFF, 2)
    this.scene.add(ambient)
    const directional = new DirectionalLight(0xFFFFFF, 1.5)
    directional.position.set(20, 50, 0)
    this.scene.add(directional)

    // FLOOR
    const floorWidth = this.floorSize * this.incursion.currentRoom.width
    const floorDepth = this.floorSize * this.incursion.currentRoom.height
    const cuboid = new TransparentCuboid(
      new Vector3(floorWidth, this.FLOOR_HEIGHT, floorDepth),
      new Color(0x45293F)
    )
    this.scene.add(cuboid.assemble())
    cuboid.position.set(0, -this.FLOOR_HEIGHT / 2, 0)

    // TILES
    this.grid.assemble()
    this.scene.add(this.grid)
    this.renderer.currentScene.add(this.grid)
    this.buildEntities()
  }

  public animateScene(time: number): void {
  }

  public onPointerMove(ctx: InputEventContext) {
    if (ctx.tile) {
      const tiles = new Set(this.getTilesInRange(ctx.tile.coord))

      for (const tile of tiles) {
        if (!this.lastTiles.has(tile)) tile.setHover(true)
      }
      for (const tile of this.lastTiles) {
        if (!tiles.has(tile)) tile.setHover(false)
      }

      this.lastTiles = tiles
    } else {
      for (const tile of this.lastTiles) tile.setHover(false)
      this.lastTiles.clear()
    }
  }

  private getTilesInRange(pos: Vector2): Tile[] {
    const half = Math.floor(this.selectionRange / 2)
    const result: Tile[] = []

    for (let x = pos.x - half; x <= pos.x + half; x++) {
      for (let y = pos.y - half; y <= pos.y + half; y++) {
        if (x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height) {
          result.push(this.grid.tiles[x][y] as Tile)
        }
      }
    }

    return result
  }

  private buildEntities() {
    for (const iie of this.incursion.currentRoom.entities) {
      if (iie.entity.entityId.includes('character')) {
        const characterModel = new CharacterModel(iie as unknown as Character).assemble()
        this.grid.add(characterModel)
        this.grid.placeAt(characterModel, new Vector2(iie.position.x, iie.position.y))
      } else {
        const entityModel = new EntityModel(iie.entity).assemble()
        this.grid.add(entityModel)
        this.grid.placeAt(entityModel, new Vector2(iie.position.x, iie.position.y))
      }
    }
  }
}
