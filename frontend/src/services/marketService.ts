// frontend/src/services/marketService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchMarketPrices = async (commodity?: string) => {
  let url = `${API_URL}/market`
  if (commodity) {
    url += `?commodity=${encodeURIComponent(commodity)}`
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch market prices')
  return response.json()
}

export const fetchRecommendations = async (soilData: any) => {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(soilData),
  })
  if (!response.ok) throw new Error('Failed to fetch recommendations')
  return response.json()
}

export const saveSoilData = async (soilData: any) => {
  const response = await fetch(`${API_URL}/soil`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(soilData),
  })
  if (!response.ok) throw new Error('Failed to save soil data')
  return response.json()
}

export const fetchHistory = async (farmer_id: number) => {
  const response = await fetch(`${API_URL}/soil/history/${farmer_id}`)
  if (!response.ok) throw new Error('Failed to fetch history')
  return response.json()
}

export const fetchPestAlerts = async () => {
  const response = await fetch(`${API_URL}/pests`)
  if (!response.ok) throw new Error('Failed to fetch pest alerts')
  return response.json()
}
