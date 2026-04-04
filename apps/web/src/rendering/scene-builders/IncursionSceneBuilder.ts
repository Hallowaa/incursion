import type GraphicObject from '../GraphicObject'
import type Renderer from '../Renderer'
import type Character from '@/datatypes/business/entity/Character'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import { EntityKind } from '@incursion/dto'
import { AmbientLight, Color, DirectionalLight, Vector2, Vector3 } from 'three'
import CharacterModel from '../game-objects/character-models.ts/CharacterModel'
import EntityModel from '../game-objects/character-models.ts/EntityModel'
import Grid from '../Grid'
import TransparentCuboid from '../shapes/TransparentCuboid'
import SceneBuilder from './SceneBuilder'

export default class IncursionSceneBuilder extends SceneBuilder {
  public grid: Grid

  private FLOOR_HEIGHT = 800
  private floorSize = 175

  private entityModelMap: Map<string, GraphicObject> = new Map()

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
    for (const iie of this.incursion.currentRoom.entities) {
      const model = this.entityModelMap.get(iie.entity._id)

      if (!model) {
        continue
      }

      this.grid.placeAt(model, new Vector2(iie.position.x, iie.position.y))
    }
  }

  private buildEntities() {
    for (const iie of this.incursion.currentRoom.entities) {
      if (iie.entity.kind === EntityKind.CHARACTER) {
        const characterModel = new CharacterModel(iie as unknown as Character).assemble()
        this.entityModelMap.set(iie.entity._id, characterModel)
        this.grid.add(characterModel)
        this.grid.placeAt(characterModel, new Vector2(iie.position.x, iie.position.y))
      } else {
        const entityModel = new EntityModel(iie.entity).assemble()
        this.entityModelMap.set(iie.entity._id, entityModel)
        this.grid.add(entityModel)
        this.grid.placeAt(entityModel, new Vector2(iie.position.x, iie.position.y))
      }
    }
  }
}
