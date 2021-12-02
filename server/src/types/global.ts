import { FastifyRequest } from 'fastify';
import { PrismaClient } from "@prisma/client";

export interface AppRequest extends FastifyRequest {
  prisma: PrismaClient
}

declare module 'fastify' {
  interface FastifyRequest {
    prisma: PrismaClient
  }
}
