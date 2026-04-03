import type { Vector2 } from 'three'
import { Color, Euler, Vector3 } from 'three'
import { Text } from 'troika-three-text'
import GraphicObject from '../GraphicObject'
import OpaqueCuboid from '../shapes/OpaqueCuboid'
import TransparentCuboid from '../shapes/TransparentCuboid'

export default class Tile extends GraphicObject {
  private hoverEffect: GraphicObject | undefined
  public constructor(
    public size: Vector3,
    public color: Color,
    public coord: Vector2
  ) {
    super()

    this.name = 'tile'
  }

  public assemble(): GraphicObject {
    const cuboid = new OpaqueCuboid(this.size, this.color).assemble()
    this.add(cuboid)

    const text = new Text()
    text.text = `[${this.coord.x},${this.coord.y}]`
    text.fontSize = 30
    text.color = '#ffd493'
    text.anchorX = 'center'
    text.anchorY = 'middle'
    text.position.y = this.size.y / 2 + 0.01
    text.rotation.x = -Math.PI / 2
    text.sync()
    this.add(text)

    const hoverEffectHeight = 80

    this.hoverEffect = new TransparentCuboid(new Vector3(this.size.x - 2, hoverEffectHeight, this.size.z - 2), new Color(0xFFD800), true).assemble()

    this.hoverEffect.setRotationFromEuler(new Euler(-Math.PI, 0, 0))
    this.hoverEffect.translateY(-hoverEffectHeight / 2 + 1)
    this.add(this.hoverEffect)
    this.hoverEffect.visible = false

    return this
  }

  public setHover(hover: boolean) {
    if (!this.hoverEffect) {
      return
    }

    this.hoverEffect.visible = hover
  }
}
