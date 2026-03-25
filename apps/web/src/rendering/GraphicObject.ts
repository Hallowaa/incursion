import type { Object3DEventMap } from 'three'
import { Object3D } from 'three'

export default abstract class GraphicObject extends Object3D<Object3DEventMap> {
  public abstract assemble(): GraphicObject
}
