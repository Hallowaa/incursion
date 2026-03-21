import http from 'node:http'

import * as dotenv from 'dotenv'
import { app } from './app'
import { connectDB } from './config/db'
import { loadItemModRegistry } from './registries/ItemModRegistry'
import { loadItemTemplateCache } from './registries/ItemTemplateCache'
import { initSocket } from './socket'

dotenv.config()

async function start() {
  await connectDB()
  await loadItemModRegistry()
  await loadItemTemplateCache()

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
