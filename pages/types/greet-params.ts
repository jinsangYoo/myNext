import type { ParsedUrlQuery } from 'querystring'

interface GreetParams extends ParsedUrlQuery {
  name?: string
}

export type { GreetParams }
