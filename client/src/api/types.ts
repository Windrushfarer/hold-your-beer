export interface ApiResponse<T> {
  items: T[]
  count: number
  left: number
}

export interface QueryParams {
  page: number
  rows: number
}