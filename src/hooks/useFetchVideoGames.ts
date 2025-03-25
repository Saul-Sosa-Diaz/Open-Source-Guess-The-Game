import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Plataforms } from '../constants/plataforms'
import { videoGame } from '../types/videoGame'

export const fetchGames = async () => {
  const apiKey = process.env.API_KEY
  const games = []
  try {
    let nextPageUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=50&`
    const platformsID = Plataforms.map((platform) => platform.id)
    const platforms = platformsID.join(',')
    nextPageUrl += `platforms=${platforms}`
    console.log(nextPageUrl)

    while (nextPageUrl) {
      const { data } = await axios.get(nextPageUrl)
      const newGames = data.results.map((game: videoGame) => {
        return {
          id: game.id,
          slug: game.slug,
          name: game.name,
          playtime: game.playtime,
          released: game.released,
          rating: game.rating,
          short_screenshots: game.short_screenshots,
          genres: game.genres,
        }
      })
      games.push(...newGames)
      nextPageUrl = data.next
      await new Promise((r) => setTimeout(r, 1000)) // Avoid rate limit
    }

    return games
  } catch (error) {
    throw new Error('Error FETCHING GAMES')
  }
}

export const useFetchVideoGames = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5,
  })
}
