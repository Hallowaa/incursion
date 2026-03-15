import { BaseError } from '@/barrel'

/**
 * Class representing if an error occurs in an RESTAPI call.
 */
export default class RestError extends BaseError {
  /**
   * Creates a premade message for the error.
   * @param restErrorMessage - The message of the RESTAPI error.
   * @returns The premade message.
   */
  public static premadeMessage(restErrorMessage: string): string {
    const PREMADEMESSAGE = `This error occured in an RESTAPI call with message:\n  ${restErrorMessage}`
    return PREMADEMESSAGE
  }

  /**
   * Creates an instance of RestError.
   * @param message - The message of the error.
   * @param code - The http response code.
   * @param hint - The hint of the errors stack trace.
   */
  public constructor(
    message: string,
    public readonly code: number,
    public readonly hint?: string
  ) {
    super(message)
    this.contextList = []
  }

  /**
   * Adds additional context to the error.
   * @param context - The context to add.
   */
  public addContext(context: string): void {
    this.contextList.push(context)
  }

  /**
   * Gets the context of the error.
   * @returns The context of the error.
   */
  public getContextList(): string[] {
    return this.contextList
  }
}
