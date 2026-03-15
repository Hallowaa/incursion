import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
