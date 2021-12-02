import { Beer } from '../shared/types/domain'
import { ApiResponse, QueryParams } from "./types"

const API_URL = import.meta.env.VITE_API_URL

export type BeerResponse = ApiResponse<Beer>

function transformResponse(response: BeerResponse): BeerResponse {
  return {
    items: response.items.map(beer => {
      return {
        ...beer,
        abv: Number(beer.abv.toFixed(2)),
      }
    }),
    count: response.count,
  }
}

export async function fetchBeers({ page, rows }: QueryParams): Promise<BeerResponse> {
  const url = `${API_URL}/beers?page=${page}&rows=${rows}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Fetching beers failed with ${response.status}, ${response.statusText}`)
  }

  const data: BeerResponse = await response.json()

  return transformResponse(data)
}