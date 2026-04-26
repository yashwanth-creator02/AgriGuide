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
