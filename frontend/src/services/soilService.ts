// frontend/src/services/soilService.ts

import { getAuthHeaders } from './authService'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const saveSoilData = async (soilData: any) => {
  const response = await fetch(`${API_URL}/soil`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(soilData),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to save soil data')
  }
  return response.json()
}

export const fetchHistory = async (farmer_id: number) => {
  const response = await fetch(`${API_URL}/soil/history/${farmer_id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to fetch history')
  }
  return response.json()
}

export const deleteSoilEntry = async (id: number) => {
  const response = await fetch(`${API_URL}/soil/history/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to delete entry')
  }
  return response.json()
}
