import { RouteHandler } from "fastify";
import { AppRequest } from "../types/global";

interface Query {
  page?: number
  rows?: number
}

export const getBreweries: RouteHandler = async (request: AppRequest, reply) => {
  let { page = 1, rows = 1 } = request.query as Query
  page = Math.max(Number(page), 1)
  rows = Math.max(Number(rows), 20)

  const items = await request.prisma.brewery.findMany({
    skip: (page - 1) * rows,
    take: rows,
  })
  const count = await request.prisma.brewery.count()

  reply.send({
    items,
    count
  })
}
