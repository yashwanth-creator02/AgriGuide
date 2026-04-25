// backend/src/types/index.ts

export interface Farmer {
    id: number
    name: string
    phone: string
    location: string
    created_at: Date
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
    created_at: Date
}

export interface Recommendation {
    id: number
    farmer_id: number
    soil_id: number
    crop_name: string
    suitability_score: number
    reason: string
    created_at: Date
}

export interface WeatherData {
    temperature: number
    humidity: number
    rainfall: number
    wind_speed: number
    location: string
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