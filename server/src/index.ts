import dotenv from 'dotenv'
import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { beersRoutes, breweriesRoutes } from './routes'

dotenv.config()

const server = fastify()
const prisma = new PrismaClient()

server.decorateRequest('prisma', prisma)

server.get('/ping', async () => {
  return { pong: true }
})

server.register(beersRoutes, { prefix: '/api' })
server.register(breweriesRoutes, { prefix: '/api' })

async function start() {
  try {
    await server.listen(3000)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log(`Server listening on ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
  .finally(async () => {
    await prisma.$disconnect()
  })

