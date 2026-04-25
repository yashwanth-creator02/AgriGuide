// frontend/src/constants/index.ts

export const SEASONS = [
  { label: 'Kharif (June - October)', value: 'kharif' },
  { label: 'Rabi (November - April)', value: 'rabi' },
  { label: 'Zaid (April - June)', value: 'zaid' },
]

export const SOIL_TYPES = [
  { label: 'Clay', value: 'clay' },
  { label: 'Sandy Loam', value: 'sandy loam' },
  { label: 'Loamy', value: 'loamy' },
  { label: 'Clay Loam', value: 'clay loam' },
  { label: 'Black Soil', value: 'black soil' },
]

export const SEVERITY_COLORS: Record<string, string> = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-yellow-100 text-yellow-600',
  Low: 'bg-green-100 text-green-600',
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
