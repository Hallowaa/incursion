const STACK_FILE_RE = /\((.+?):(\d+):\d+\)/
const PATH_SEP_RE = /[/\\]/
const FILENAME_LENGTH = 28

export default class Log {
  public static i(message: string) {
    console.warn(`${this.getFilename()}> ${message}`)
  }

  public static e(message: string) {
    console.error(`${this.getFilename()}> ${message}`)
  }

  private static getFilename() {
    const match = new Error('stack').stack?.split('\n')[3]?.match(STACK_FILE_RE)
    const filename = `[${match?.[1]?.split(PATH_SEP_RE).pop() ?? 'unknown'}:${match?.[2] ?? '?'}]`
    return filename.padEnd(FILENAME_LENGTH, '-')
  }
}
