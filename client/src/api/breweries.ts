import { Brewery } from '../shared/types/domain'
import { ApiResponse, QueryParams } from './types'

const API_URL = import.meta.env.VITE_API_URL

export type BreweryResponse = ApiResponse<Brewery>

export async function fetchBreweries({ page, rows }: QueryParams): Promise<BreweryResponse> {
  const url = `${API_URL}/breweries?page=${page}&rows=${rows}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Fetching breweries failed with ${response.status}, ${response.statusText}`)
  }

  return await response.json() as BreweryResponse
}