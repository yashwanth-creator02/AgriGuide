// frontend/src/services/profileService.ts

const API_URL = import.meta.env.VITE_API_URL

export const fetchProfile = async (farmer_id: number) => {
  const response = await fetch(`${API_URL}/farmers/profile/${farmer_id}`)
  if (!response.ok) throw new Error('Failed to fetch profile')
  return response.json()
}

export const updateProfile = async (farmer_id: number, data: { name: string; phone: string; location: string }) => {
  const response = await fetch(`${API_URL}/farmers/profile/${farmer_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update profile')
  return response.json()
}
