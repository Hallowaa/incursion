import * as dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import { app } from './app'
import { connectDB } from './config/db'
import { initSocket } from './socket'

async function start() {
  await connectDB()

  const server = http.createServer(app)
  initSocket(server)

  server.listen(Number(process.env.PORT), () => {
    console.log('Server running on http://localhost:3000')
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
