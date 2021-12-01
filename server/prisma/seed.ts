import fs from 'fs'
import path from 'path'

async function main() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'db/beers.json'), 'utf8')
  const data = JSON.parse(raw)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })