import type Renderer from '../Renderer'
import { Scene } from 'three'

export default abstract class SceneBuilder {
  public scene: Scene = new Scene()
  public constructor(public renderer: Renderer) {}

  public abstract buildScene(): void
  public abstract animateScene(time: number): void
}
