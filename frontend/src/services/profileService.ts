// frontend/src/services/profileService.ts

import { getAuthHeaders } from './authService'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchProfile = async (farmer_id: number) => {
  const response = await fetch(`${API_URL}/farmers/profile/${farmer_id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to fetch profile')
  }
  return response.json()
}

export const updateProfile = async (
  farmer_id: number,
  data: { name: string; phone: string; location: string }
) => {
  const response = await fetch(`${API_URL}/farmers/profile/${farmer_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to update profile')
  }
  return response.json()
}
