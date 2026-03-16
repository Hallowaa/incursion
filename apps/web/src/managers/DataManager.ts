import type CommunicationManager from './CommunicationManager'
import type BusListener from '@/buses/BusListener'
import type UserUpdateBus from '@/buses/UserUpdateBus'
import type User from '@/datatypes/business/User'

export default class DataManager implements BusListener<UserUpdateBus> {
  public user: User | undefined

  public constructor(readonly communicationManager: CommunicationManager) {}

  update(bus: UserUpdateBus): void {
    this.user = bus.user
  }
}
