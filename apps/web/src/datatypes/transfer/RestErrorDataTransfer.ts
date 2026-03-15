import { RestError } from '@/barrel'

export default class RestErrorDataTransfer {
  public constructor(
    readonly message: string,
    readonly contextList: string[]
  ) {}

  public toRestError(): RestError {
    const restError = new RestError(this.message, 0)
    this.contextList.forEach((context) => restError.addContext(context))
    return restError
  }
}
