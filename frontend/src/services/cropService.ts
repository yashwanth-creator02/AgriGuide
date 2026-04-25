// frontend/src/services/cropService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchCrops = async () => {
  const response = await fetch(`${API_URL}/crops`)
  if (!response.ok) throw new Error('Failed to fetch crops')
  return response.json()
}

export const fetchCropByName = async (name: string) => {
  const response = await fetch(`${API_URL}/crops/${encodeURIComponent(name)}`)
  if (!response.ok) throw new Error('Failed to fetch crop')
  return response.json()
}
