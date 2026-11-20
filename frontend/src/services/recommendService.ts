// frontend/src/services/recommendService.ts

import { getAuthHeaders } from './authService'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchRecommendations = async (soilData: any) => {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(soilData),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to fetch recommendations')
  }
  return response.json()
}
