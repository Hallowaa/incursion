import type Entity from '@/datatypes/business/entity/Entity'
import { Color, Vector3 } from 'three'
import GraphicObject from '@/rendering/GraphicObject'
import OpaqueCuboid from '@/rendering/shapes/OpaqueCuboid'

export default class EntityModel extends GraphicObject {
  public constructor(
    public entity: Entity
  ) {
    super()
  }

  public assemble(): GraphicObject {
    const body = new OpaqueCuboid(
      new Vector3(100, 100, 100),
      new Color(0x00FF00)
    ).assemble()
    this.add(body)
    return this
  }
}
