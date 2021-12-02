import { FastifyPluginCallback } from 'fastify'
import { getBreweries } from '../handlers/breweries';

export const breweriesRoutes: FastifyPluginCallback = async (server, opts, next) => {
  server.get('/breweries', getBreweries)

  next()
}