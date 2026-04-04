import jwt from 'jsonwebtoken'
import Log from '../util/Log'

const ACCESS_SECRET = 'access-secret'

export function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyAccessToken(token)
    req.user = decoded
    next()
  } catch {
    Log.e('Unauthorised request')
    return res.sendStatus(403)
  }
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as { userId: string }
}
