const CACHE_PREFIX = 'bazaar_builds_'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

interface CacheItem<T> {
  data: T
  timestamp: number
}

export const cacheData = <T>(key: string, data: T): void => {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem))
  } catch (error) {
    console.error('Error caching data:', error)
  }
}

export const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`)
    if (!cached) return null

    const cacheItem: CacheItem<T> = JSON.parse(cached)
    
    // Check if cache is expired
    if (Date.now() - cacheItem.timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`)
      return null
    }

    return cacheItem.data
  } catch (error) {
    console.error('Error retrieving cached data:', error)
    return null
  }
} 