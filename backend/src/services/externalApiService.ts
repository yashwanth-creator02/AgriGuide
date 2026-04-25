// backend/src/services/externalApiService.ts

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

// TODO: Integrate data.gov.in for market prices
// TODO: Integrate NIPHM for pest alerts