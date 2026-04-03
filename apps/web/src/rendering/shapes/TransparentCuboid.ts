import type { Color, Vector3 } from 'three'
import { BoxGeometry, DoubleSide, FrontSide, Mesh, ShaderLib, ShaderMaterial, UniformsUtils } from 'three'
import GraphicObject from '../GraphicObject'

export default class TransparentCuboid extends GraphicObject {
  public constructor(
    public readonly size: Vector3,
    public readonly color: Color,
    public readonly double: boolean = false
  ) {
    super()
    this.name = 'cube'
  }

  public override assemble(): GraphicObject {
    const geometry = new BoxGeometry(this.size.x, this.size.y, this.size.z)

    const phong = ShaderLib.phong
    const halfHeight = (this.size.y / 2).toFixed(6)
    const height = this.size.y.toFixed(6)

    const vertexShader = phong.vertexShader
      .replace(
        'void main() {',
        'varying float vAlpha;\nvoid main() {'
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>\nvAlpha = (position.y + ${halfHeight}) / ${height};`
      )

    const fragmentShader = phong.fragmentShader
      .replace(
        'void main() {',
        'varying float vAlpha;\nvoid main() {'
      )
      .replace(
        '#include <opaque_fragment>',
        '#include <opaque_fragment>\nfloat ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));\ngl_FragColor.a *= pow(vAlpha, 3.0) + (ign - 0.5) / 48.0;'
      )

    const uniforms = UniformsUtils.clone(phong.uniforms)
    uniforms.diffuse.value = this.color

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      lights: true,
      side: this.double ? DoubleSide : FrontSide
    })

    const cube = new Mesh(geometry, material)
    this.add(cube)
    return this
  }
}
