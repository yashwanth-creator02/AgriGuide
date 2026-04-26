// frontend/src/services/soilService.ts

const API_URL = import.meta.env.VITE_API_URL

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

export const deleteSoilEntry = async (id: number) => {
  const response = await fetch(`${API_URL}/soil/history/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete entry')
  return response.json()
}
