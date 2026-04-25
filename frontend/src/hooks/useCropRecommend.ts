// frontend/src/hooks/useCropRecommend.ts

import { useState } from 'react'
import { fetchRecommendations } from '../services/marketService'

export const useCropRecommend = () => {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRecommendations = async (soilData: any) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchRecommendations(soilData)
      setRecommendations(data)
      return data
    } catch (err: any) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  return { recommendations, loading, error, getRecommendations }
}
