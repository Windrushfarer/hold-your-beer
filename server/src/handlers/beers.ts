import { RouteHandler } from "fastify";
import { AppRequest } from "../types/global";

interface Query {
  page?: number
  rows?: number
}

export const getBeers: RouteHandler = async (request: AppRequest, reply) => {
  let { page = 1, rows = 1 } = request.query as Query
  page = Math.max(Number(page), 1)
  rows = Math.max(Number(rows), 20)

  const skip = (page - 1) * rows

  const items = await request.prisma.beer.findMany({
    skip,
    take: rows,
  })
  const count = await request.prisma.beer.count()
  const left = Math.max(count - (skip + rows), 0)

  reply.send({
    items,
    count,
    left
  })
}