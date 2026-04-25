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

export const getMarketPrices = async (commodity?: string) => {
    try {
        // Updated Resource ID for active daily prices
        const resourceId = "9ef84268-d588-465a-a308-a864a43d0070";
        const apiKey = process.env.MARKET_API_KEY;

        let url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=20`;

        if (commodity) {
            // Adding sorting so the user sees the newest prices first
            url += `&filters[commodity]=${encodeURIComponent(commodity)}&sort[arrival_date]=desc`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json() as any;
        console.log('Market API response:', JSON.stringify(data, null, 2))
        if (!data.records || data.records.length === 0) {
            return [];
        }

        return data.records.map((record: any) => ({
            crop: record.commodity,
            market: record.market,
            district: record.district,
            state: record.state,
            min_price: record.min_price,
            max_price: record.max_price,
            price: record.modal_price,
            unit: 'Quintal',
            updated: record.arrival_date,
        }))
    } catch (error) {
        console.error('Market prices error:', error);
        return [];
    }
}
// TODO: Integrate NIPHM for pest alerts