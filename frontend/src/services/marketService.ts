// frontend/src/services/marketService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchMarketPrices = async (commodity?: string, page: number = 1) => {
  let url = `${API_URL}/market?page=${page}&limit=20`
  if (commodity) {
    url += `&commodity=${encodeURIComponent(commodity)}`
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch market prices')
  return response.json()
}
