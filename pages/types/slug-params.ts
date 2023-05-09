import type { ParsedUrlQuery } from 'querystring'

interface SlugParams extends ParsedUrlQuery {
  slug?: string
}

export type { SlugParams }
