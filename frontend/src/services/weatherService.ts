// frontend/src/services/weatherService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchWeather = async (location: string) => {
  const response = await fetch(`${API_URL}/weather?location=${encodeURIComponent(location)}`)
  if (!response.ok) throw new Error('Failed to fetch weather data')
  return response.json()
}
