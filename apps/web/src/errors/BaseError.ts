/**
 * Class representing if something is not found.
 */
export default class BaseError extends Error {
  protected contextList: string[] = []
  protected readonly hint?: string

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = new.target.name
    this.contextList = []
  }

  /**
   * Adds additional context to the error.
   * @param context - The context to add.
   * @throws
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

  /**
   * Method to return the Hint.
   * @returns The Hint.
   */
  public getHint(): string | undefined {
    return this.hint
  }
}
