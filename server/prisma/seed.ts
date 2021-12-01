import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const beersData = fs.readFileSync(path.join(process.cwd(), 'db/beers.json'), 'utf8')
  const breweriesData = fs.readFileSync(path.join(process.cwd(), 'db/breweries.json'), 'utf8')

  const breweries = JSON.parse(breweriesData)

  await Promise.all(
    breweries.map(brewery => {
      const { id, name, city, state } = brewery

      return prisma.brewery.create({
        data: {
          id,
          name,
          city,
          state,
        },
      })
    })
  )

  const beers = JSON.parse(beersData)

  await Promise.all(
    beers.map(beer => {
      const { id, name, style, abv, breweryId, ounces } = beer

      return prisma.beer.create({
        data: {
          id,
          name,
          style,
          ounces,
          breweryId,
          abv,
        },
      })
    })
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })