export type Brewery = {
  id: number
  name: string
  city: string
  state: string
}

export type Beer = {
  id: number
  name: string
  style: string
  abv: number
  ounces: number
  breweryId: number | null
}

export type View = 'beers' | 'breweries'