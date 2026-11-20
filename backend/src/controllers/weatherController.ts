// backend/src/controllers/weatherController.ts

import { Request, Response } from 'express'
import {
    getCoordinatesFromName,
    getWeatherFromOpenMeteo,
    reverseGeocodeCoordinates,
} from '../services/externalApiService'

// Get weather data from location name
export const getWeather = async (req: Request, res: Response) => {
    try {
        const { location } = req.query

        if (!location || typeof location !== 'string') {
            return res.status(400).json({ message: 'Location is required' })
        }

        const coords = await getCoordinatesFromName(location)
        const current = await getWeatherFromOpenMeteo(coords.lat, coords.lng)

        res.json({
            location: `${coords.name}, ${coords.country}`,
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            rainfall: current.rain,
            wind_speed: current.wind_speed_10m,
        })
    } catch (error: any) {
        if (error.message === 'Location not found') {
            return res.status(404).json({
                message: `Could not find location: "${req.query.location}". Please try a nearby city name.`,
            })
        }
        console.error('Weather error:', error)
        res.status(500).json({ message: error.message || 'Error fetching weather data' })
    }
}

// Reverse geocode coordinates to location name
export const reverseGeocode = async (req: Request, res: Response) => {
    try {
        const lat = parseFloat(req.query.lat as string)
        const lng = parseFloat(req.query.lng as string)

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ message: 'Valid lat and lng query parameters are required' })
        }

        const result = await reverseGeocodeCoordinates(lat, lng)
        res.json(result)
    } catch (error: any) {
        console.error('Reverse geocode error:', error)
        res.status(500).json({ message: 'Error determining location from coordinates' })
    }
}
