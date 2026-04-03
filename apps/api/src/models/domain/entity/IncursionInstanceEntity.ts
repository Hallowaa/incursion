import Position from '../incursion/Position'
import Entity from './Entity'

export default class IncursionInstanceEntity {
  public constructor(
    public entity: Entity,
    public position: Position
  ) {}

  public static clone(iie: IncursionInstanceEntity): IncursionInstanceEntity {
    return new IncursionInstanceEntity(Entity.clone(iie.entity), Position.clone(iie.position))
  }

  public abilities() {
    return this.entity.getAbilities()
  }
}
