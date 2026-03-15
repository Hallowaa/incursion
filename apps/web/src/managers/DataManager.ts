import type { CommunicationManager, BusListener, UserUpdateBus, User } from '@/barrel'

export default class DataManager implements BusListener<UserUpdateBus> {
  public user: User | undefined

  public constructor(readonly communicationManager: CommunicationManager) {}

  update(bus: UserUpdateBus): void {
    this.user = bus.user
  }
}
