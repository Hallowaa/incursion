import type { Object3DEventMap } from 'three'
import { Object3D } from 'three'

export default abstract class GraphicObject extends Object3D<Object3DEventMap> {
  public abstract assemble(): GraphicObject

  public static findAncestor<T extends GraphicObject>(
    obj: GraphicObject,
    type: new (...args: any[]) => T
  ): T | undefined {
    let current: GraphicObject | null = obj
    while (current) {
      if (current instanceof type) return current as T
      current = current.parent as GraphicObject | null
    }
    return undefined
  }
}
