import type Character from '@/datatypes/business/entity/Character'
import { Color, Euler, Vector3 } from 'three'
import GraphicObject from '@/rendering/GraphicObject'
import OpaqueCuboid from '@/rendering/shapes/OpaqueCuboid'
import TransparentCuboid from '@/rendering/shapes/TransparentCuboid'
import { useCharacterStore } from '@/stores/CharacterStore'

export default class CharacterModel extends GraphicObject {
  private rangeDisplay: GraphicObject | undefined
  public constructor(
    public character: Character
  ) {
    super()
    this.name = 'character'
  }

  public assemble(): GraphicObject {
    const body = new OpaqueCuboid(
      new Vector3(100, 100, 100),
      new Color('#c50000')
    ).assemble()

    this.add(body)
    this.updateRangeDisplay()
    return this
  }

  public updateRangeDisplay(): void {
    if (this.rangeDisplay) {
      this.remove(this.rangeDisplay)
    }

    const characterStore = useCharacterStore()

    if (!characterStore.currentAbility) {
      return
    }

    const size = (characterStore.currentAbility?.props.baseRange * 2 + 1) * 175
    this.rangeDisplay = new TransparentCuboid(new Vector3(size, 80, size), new Color('#121212'), true, 0.5).assemble()
    this.rangeDisplay.setRotationFromEuler(new Euler(-Math.PI, 0, 0))
    this.rangeDisplay.translateY(10)
    this.add(this.rangeDisplay)
  }
}
