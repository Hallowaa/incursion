import type { Color, Vector3 } from 'three'
import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three'
import GraphicObject from '../GraphicObject'

export default class OpaqueCuboid extends GraphicObject {
  public constructor(
    public readonly size: Vector3,
    public readonly color: Color
  ) {
    super()
    this.name = 'cube'
  }

  public assemble(): GraphicObject {
    const geometry = new BoxGeometry(this.size.x, this.size.y, this.size.z)
    const material = new MeshPhongMaterial({ color: this.color })
    const cube = new Mesh(geometry, material)
    this.add(cube)

    return this
  }
}
