import type { Vector2 } from 'three'
import type Tile from '../game-objects/Tile'

export default interface InputEventContext {
  button?: number
  pos?: Vector2
  tile?: Tile
}
