import { FastifyPluginCallback } from 'fastify'
import { getBeers } from '../handlers/beers'

export const beersRoutes: FastifyPluginCallback = async (server, opts, next) => {
  server.get('/beers', getBeers)

  next()
}