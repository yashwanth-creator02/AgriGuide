// frontend/src/services/marketService.ts

const API_URL = import.meta.env.VITE_API_URL

// Market prices will come from Agmarknet API later
// For now returning dummy data
export const fetchMarketPrices = async () => {
  return [
    { crop: 'Wheat', price: 2150, market: 'Pune, Maharashtra', updated: '25 Apr 2026' },
    { crop: 'Rice', price: 3200, market: 'Hyderabad, Telangana', updated: '25 Apr 2026' },
    { crop: 'Maize', price: 1800, market: 'Bangalore, Karnataka', updated: '24 Apr 2026' },
    { crop: 'Soybean', price: 4100, market: 'Indore, Madhya Pradesh', updated: '24 Apr 2026' },
    { crop: 'Cotton', price: 6500, market: 'Ahmedabad, Gujarat', updated: '23 Apr 2026' },
    { crop: 'Sugarcane', price: 350, market: 'Lucknow, Uttar Pradesh', updated: '23 Apr 2026' },
  ]
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
