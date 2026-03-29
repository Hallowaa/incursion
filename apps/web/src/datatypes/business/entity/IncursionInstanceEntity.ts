import type Position from '../incursion/Position'
import type Entity from './Entity'

export default class IncursionInstanceEntity {
  public constructor(
    public entity: Entity,
    public position: Position
  ) {}
}
