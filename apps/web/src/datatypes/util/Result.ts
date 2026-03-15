export type Result<T, E extends Error = Error> =
  | { success: true, result: T }
  | { success: false, error: E }
