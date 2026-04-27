// backend/src/controllers/weatherController.ts

import { Request, Response } from 'express'

// Get coordinates from location name using Open-Meteo Geocoding API
const getCoordinates = async (location: string) => {
    const parts = location.split(',').map((p) => p.trim())

    // Try each part of the location until one works
    for (const part of parts) {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(part)}&count=1`
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

// Get weather data from Open-Meteo
export const getWeather = async (req: Request, res: Response) => {
    try {
        const { location } = req.query;
        console.log('Weather location received:', location);

        if (!location || typeof location !== 'string') {
            return res.status(400).json({ message: 'Location is required' });
        }

        // --- IMPROVED COORDINATE SEARCH ---
        let coords;
        try {
            // First attempt: Full string
            coords = await getCoordinates(location);
        } catch (e) {
            // Second attempt: If it contains a comma, try searching only the city name
            if (location.includes(',')) {
                const cityName = location.split(',')[0].trim();
                console.log(`Retrying search with simplified name: ${cityName}`);
                coords = await getCoordinates(cityName);
            } else {
                // If there's no comma and it failed, re-throw to be caught by outer catch
                throw e;
            }
        }

        // Step 2: Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m`
        );

        if (!weatherResponse.ok) {
            throw new Error('Weather service is currently unavailable');
        }

        const weatherData = await weatherResponse.json() as any;
        const current = weatherData.current;

        // Step 3: Success response
        res.json({
            location: `${coords.name}, ${coords.country}`,
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            rainfall: current.rain,
            wind_speed: current.wind_speed_10m,
        });

    } catch (error: any) {
        console.error('Weather error:', error);

        // Handle specific "Not Found" case with a 404 instead of a 500
        if (error.message === 'Location not found') {
            return res.status(404).json({
                message: `Could not find location: "${req.query.location}". Please try a nearby city name.`
            });
        }

        // General server error
        res.status(500).json({
            message: error.message || 'Error fetching weather data'
        });
    }
}