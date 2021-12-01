import dotenv from 'dotenv'
import fastify from 'fastify'

dotenv.config()

const server = fastify()

server.get('/ping', async () => {
  return { pong: true }
})

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
