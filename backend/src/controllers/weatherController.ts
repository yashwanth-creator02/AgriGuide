// backend/src/controllers/weatherController.ts

import { Request, Response } from 'express'

// Get coordinates from location name using Open-Meteo Geocoding API
const getCoordinates = async (location: string) => {
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

// Get weather data from Open-Meteo
export const getWeather = async (req: Request, res: Response) => {
    try {
        const { location } = req.query

        if (!location) {
            return res.status(400).json({ message: 'Location is required' })
        }

        // Step 1: Get coordinates
        const coords = await getCoordinates(location as string)

        // Step 2: Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m`
        )
        const weatherData = await weatherResponse.json() as any

        const current = weatherData.current

        res.json({
            location: `${coords.name}, ${coords.country}`,
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            rainfall: current.rain,
            wind_speed: current.wind_speed_10m,
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Error fetching weather data' })
    }
}