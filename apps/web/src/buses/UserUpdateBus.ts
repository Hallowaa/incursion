import type User from '@/datatypes/business/User'
import Bus from './Bus'

export default class UserUpdateBus extends Bus {
  public user: User | undefined

  public updateUser(user: User | undefined) {
    this.user = user
    this.notify()
  }
}
