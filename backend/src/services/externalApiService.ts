// backend/src/services/externalApiService.ts

import { env } from '../config/env'

// Weather: Open-Meteo
export const getWeatherFromOpenMeteo = async (lat: number, lng: number) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m`
    )
    if (!response.ok) {
        throw new Error('Weather service unavailable')
    }
    const data = await response.json() as any
    return data.current
}

// Geocoding: Open-Meteo Geocoding API
export const getCoordinatesFromName = async (location: string) => {
    const parts = location.split(',').map((p) => p.trim()).filter(Boolean)
    const searchTerms = [location, ...parts]

    for (const term of searchTerms) {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=1&language=en&format=json`
            )
            const data = await response.json() as any
            if (data.results && data.results.length > 0) {
                return {
                    lat: data.results[0].latitude,
                    lng: data.results[0].longitude,
                    name: data.results[0].name,
                    country: data.results[0].country,
                }
            }
        } catch {
            continue
        }
    }

    throw new Error('Location not found')
}

// Reverse Geocoding via Nominatim with required compliant User-Agent
export const reverseGeocodeCoordinates = async (lat: number, lng: number) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
            headers: {
                'User-Agent': 'AgriGuide-Advisory/1.0 (agrisuggest-app)',
                'Accept': 'application/json',
            },
        }
    )
    if (!response.ok) {
        throw new Error(`Reverse geocode failed with status: ${response.status}`)
    }
    const data = await response.json() as any
    const address = data.address || {}
    const city = address.city || address.town || address.village || address.county || 'Unknown'
    const state = address.state || ''
    return {
        city,
        state,
        formatted: state ? `${city}, ${state}` : city,
    }
}

// Market Prices: data.gov.in Agmarknet API
export const getMarketPrices = async (commodity?: string, page: number = 1, limit: number = 20) => {
    try {
        const resourceId = "9ef84268-d588-465a-a308-a864a43d0070"
        const apiKey = env.MARKET_API_KEY
        const offset = (page - 1) * limit

        let url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}`
        if (commodity) {
            url += `&filters[commodity]=${encodeURIComponent(commodity)}`
        }

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 15000)

        const response = await fetch(url, { signal: controller.signal })
        clearTimeout(timeout)

        if (!response.ok) throw new Error(`API responded with status: ${response.status}`)

        const data = await response.json() as any
        if (!data.records || data.records.length === 0) {
            return { records: [], total: 0 }
        }

        return {
            records: data.records.map((record: any) => ({
                crop: record.commodity,
                market: record.market,
                district: record.district,
                state: record.state,
                min_price: record.min_price,
                max_price: record.max_price,
                price: parseFloat(record.modal_price) || 0,
                unit: 'Quintal',
                updated: record.arrival_date,
            })),
            total: data.total || data.records.length,
        }
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error('Market API timeout')
        } else {
            console.error('Market prices error:', error)
        }
        return { records: [], total: 0 }
    }
}
