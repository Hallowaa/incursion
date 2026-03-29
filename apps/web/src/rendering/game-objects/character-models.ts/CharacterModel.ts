import type Character from '@/datatypes/business/entity/Character'
import { Color, Vector3 } from 'three'
import GraphicObject from '@/rendering/GraphicObject'
import OpaqueCuboid from '@/rendering/shapes/OpaqueCuboid'

export default class CharacterModel extends GraphicObject {
  public constructor(
    public character: Character
  ) {
    super()
  }

  public assemble(): GraphicObject {
    const body = new OpaqueCuboid(
      new Vector3(100, 100, 100),
      new Color(0xFF0000)
    ).assemble()
    this.add(body)
    return this
  }
}
