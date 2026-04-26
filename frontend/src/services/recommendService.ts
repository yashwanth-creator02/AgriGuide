// frontend/src/services/recommendService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchRecommendations = async (soilData: any) => {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(soilData),
  })
  if (!response.ok) throw new Error('Failed to fetch recommendations')
  return response.json()
}
