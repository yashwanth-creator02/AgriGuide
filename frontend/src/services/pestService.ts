// frontend/src/services/pestService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchPestAlerts = async () => {
  const response = await fetch(`${API_URL}/pests`)
  if (!response.ok) throw new Error('Failed to fetch pest alerts')
  return response.json()
}
