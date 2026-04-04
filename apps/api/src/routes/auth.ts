import { randomBytes, randomInt } from 'node:crypto'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import CharacterGenerator from '../generators/CharacterGenerator'
import { CharacterModel } from '../models/schemas/entity/CharacterSchema'
import { UserModel } from '../models/schemas/UserSchema'
import Log from '../util/Log'

const router = Router()
const ACCESS_SECRET = 'access-secret'
const REFRESH_SECRET = 'refresh-secret'

router.post('/login/', async (req, res) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({ username })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, user.passwordHash ?? '')
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

  const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
    expiresIn: '15m'
  })

  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
    expiresIn: '7d'
  })

  user.refreshToken = refreshToken
  await user.save()

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.json(accessToken)
})

router.post('/refresh', async (req, res) => {
  const token = req.cookies?.refreshToken
  if (!token) return res.sendStatus(401)

  try {
    const payload = jwt.verify(token, REFRESH_SECRET) as { userId: string }

    const user = await UserModel.findById(payload.userId)

    if (!user || user.refreshToken !== token) {
      return res.sendStatus(403)
    }

    const newAccessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
      expiresIn: '15m'
    })

    res.json(newAccessToken)
  } catch {
    return res.sendStatus(403)
  }
})

router.post('/register/', async (req, res) => {
  const { username, password } = req.body

  const existingUser = await UserModel.findOne({ username })
  if (existingUser) {
    res.status(401).json({ message: 'Username taken' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const refreshToken = randomBytes(48).toString('hex')
  const user = await UserModel.create({ refreshToken, username, passwordHash })
  const characterName = `TEMP #${randomInt(10000, 99999)}`
  const character = await CharacterModel.create(
    CharacterGenerator.generateCharacter(user.id, characterName)
  )
  user.character = character.id
  await user.save()

  res.json({ success: true })
})

export default router
