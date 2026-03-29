import type { Color, Vector2, Vector3 } from 'three'
import { Text } from 'troika-three-text'
import GraphicObject from '../GraphicObject'
import OpaqueCuboid from '../shapes/OpaqueCuboid'

export default class Tile extends GraphicObject {
  public constructor(
    public size: Vector3,
    public color: Color,
    public coord: Vector2
  ) {
    super()
  }

  public assemble(): GraphicObject {
    const cuboid = new OpaqueCuboid(this.size, this.color).assemble()
    this.add(cuboid)

    const text = new Text()
    text.text = `[${this.coord.x},${this.coord.y}]`
    text.fontSize = 30
    text.color = '#000000'
    text.anchorX = 'center'
    text.anchorY = 'middle'
    text.position.y = this.size.y / 2 + 0.01
    text.rotation.x = -Math.PI / 2
    text.sync()
    this.add(text)

    return this
  }
}
