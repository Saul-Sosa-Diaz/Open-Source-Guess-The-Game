export type Genre = {
  id: number
  name: string
  slug: string
}

export type Screenshot = {
  id: number
  image: string
}

export type videoGame = {
  id: number
  slug: string
  name: string
  playtime: number
  released: string
  rating: number
  short_screenshots: Screenshot[]
  genres: Genre[]
}
