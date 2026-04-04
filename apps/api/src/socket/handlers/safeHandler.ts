import Log from '../../util/Log'

export function safeHandler(fn: (...args: any[]) => Promise<void>) {
  return async (...args: any[]) => {
    try {
      await fn(...args)
    } catch (err) {
      Log.e(`Socket handler error: ${err}`)
      // call the callback with null/error if present
      const callback = args.find((a) => typeof a === 'function')
      callback?.(null)
    }
  }
}
