// frontend/src/hooks/useWeather.ts

import { useState, useEffect } from 'react'
import { fetchWeather } from '../services/weatherService'

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!location) return
    setLoading(true)
    fetchWeather(location)
      .then(setWeather)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [location])

  return { weather, loading, error }
}
