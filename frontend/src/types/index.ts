// frontend/src/types/index.ts

export interface Farmer {
  id: number
  name: string
  phone: string
  location: string
  created_at: string
}

export interface SoilData {
  id: number
  farmer_id: number
  soil_type: string
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  location: string
  season: 'kharif' | 'rabi' | 'zaid'
  created_at: string
}

export interface Recommendation {
  id: number
  farmer_id: number
  soil_id: number
  crop_name: string
  suitability_score: number
  reason: string
  created_at: string
}

export interface WeatherData {
  location: string
  temperature: number
  humidity: number
  rainfall: number
  wind_speed: number
}

export interface MarketPrice {
  crop: string
  price: number
  market: string
  updated: string
}

export interface PestAlert {
  pest_name: string
  affected_crop: string
  region: string
  severity: 'Low' | 'Medium' | 'High'
  description: string
}

export interface CropInfo {
  name: string
  season: string
  suitable_soil: string[]
  min_ph: number
  max_ph: number
  about: string
  climate: string
  diseases: string
  watering: string
  fertilizer: string
  harvest: string
}
