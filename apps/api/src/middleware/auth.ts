import jwt from 'jsonwebtoken'

const ACCESS_SECRET = 'access-secret'
const REFRESH_SECRET = 'refresh-secret'

export function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]
  console.log(token)

  try {
    const decoded = verifyAccessToken(token)
    req.user = decoded
    next()
  } catch {
    console.log('unauth')
    return res.sendStatus(403)
  }
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as { userId: string }
}
