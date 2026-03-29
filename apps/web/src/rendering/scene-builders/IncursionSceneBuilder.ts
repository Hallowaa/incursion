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
  private FLOOR_HEIGHT = 800
  private grid: Grid
  private floorSize = 150

  public constructor(renderer: Renderer, public incursion: Incursion) {
    super(renderer)
    this.grid = new Grid(
      incursion.currentRoom.width,
      incursion.currentRoom.height
    )
  }

  public buildScene(): void {
    // LIGHTING
    const ambient = new AmbientLight(0xFFFFFF, 1)
    this.scene.add(ambient)
    const directional = new DirectionalLight(0xFFD861, 1)
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
    this.grid.assemble()
    this.scene.add(this.grid)
    this.renderer.currentScene.add(this.grid)
    this.buildEntities()
  }

  private buildEntities() {
    for (const iie of this.incursion.currentRoom.entities) {
      // TODO: change this into enum
      // TODO: use positions of InursionInstanceEntities
      if (iie.entity.entityId === 'character') {
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

  public animateScene(): void {
  }
}
