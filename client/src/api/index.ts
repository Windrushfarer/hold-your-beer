import { fetchBeers, BeerResponse } from './beers'
import { fetchBreweries, BreweryResponse } from './breweries'
import { QueryParams } from './types'

interface Api {
  fetchBeers: (params: QueryParams) => Promise<BeerResponse>
  fetchBreweries: (params: QueryParams) => Promise<BreweryResponse>
}

export const api: Api = {
  fetchBeers,
  fetchBreweries,
}