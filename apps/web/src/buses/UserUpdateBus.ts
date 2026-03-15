import { type User, Bus } from '@/barrel'

export default class UserUpdateBus extends Bus {
  public user: User | undefined

  public updateUser(user: User | undefined) {
    this.user = user
    this.notify()
  }
}
