import type Position from '../incursion/Position'
import type Entity from './Entity'

export default interface PositionedEntity {
  entity: Entity
  position: Position
}
