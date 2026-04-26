// backend/src/services/externalApiService.ts

import { env } from "process"

// External API integrations
// Weather: Open-Meteo (already in weatherController)
// Market Prices: data.gov.in (to be integrated later)
// Pest Alerts: NIPHM (to be integrated later)

export const getWeatherFromOpenMeteo = async (lat: number, lng: number) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m`
    )
    const data = await response.json() as any
    return data.current
}

export const getCoordinatesFromName = async (location: string) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
    )
    const data = await response.json() as any
    if (!data.results || data.results.length === 0) {
        throw new Error('Location not found')
    }
    return {
        lat: data.results[0].latitude,
        lng: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country,
    }
}

// Market Prices: data.gov.in Agmarknet API

export const getMarketPrices = async (commodity?: string, page: number = 1, limit: number = 20) => {
    try {
        const resourceId = "9ef84268-d588-465a-a308-a864a43d0070";
        const apiKey = process.env.MARKET_API_KEY;
        const offset = (page - 1) * limit

        let url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}`

        if (commodity) {
            url += `&filters[commodity]=${encodeURIComponent(commodity)}`
        }

        // Add timeout of 15 seconds
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
            total: data.total,
        }
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error('Market API timeout')
            return { records: [], total: 0 }
        }
        console.error('Market prices error:', error)
        return { records: [], total: 0 }
    }
}
// TODO: Integrate NIPHM for pest alerts