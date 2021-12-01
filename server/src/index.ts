import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  const beer = await prisma.beer.findFirst({
    where: {
      name: {
        contains: 'Pub',
      },
    },
    include: {
      brewery: true,
    }
  })

  console.log(beer)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })