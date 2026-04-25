// backend/src/controllers/recommendController.ts

import { Request, Response } from 'express'
import pool from '../config/db'

// Simple crop database for scoring logic
// Later this can be replaced with an external API
const cropRequirements = [
    {
        name: 'Wheat',
        season: 'rabi',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        min_nitrogen: 80,
        min_phosphorus: 40,
        min_potassium: 30,
    },
    {
        name: 'Rice',
        season: 'kharif',
        suitable_soil: ['clay', 'clay loam'],
        min_ph: 5.5,
        max_ph: 6.5,
        min_nitrogen: 80,
        min_phosphorus: 40,
        min_potassium: 40,
    },
    {
        name: 'Maize',
        season: 'kharif',
        suitable_soil: ['sandy loam', 'loamy'],
        min_ph: 5.8,
        max_ph: 7.0,
        min_nitrogen: 100,
        min_phosphorus: 50,
        min_potassium: 40,
    },
    {
        name: 'Soybean',
        season: 'kharif',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        min_nitrogen: 20,
        min_phosphorus: 60,
        min_potassium: 40,
    },
    {
        name: 'Cotton',
        season: 'kharif',
        suitable_soil: ['black soil', 'clay'],
        min_ph: 6.0,
        max_ph: 8.0,
        min_nitrogen: 80,
        min_phosphorus: 40,
        min_potassium: 40,
    },
    {
        name: 'Sugarcane',
        season: 'zaid',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        min_nitrogen: 150,
        min_phosphorus: 60,
        min_potassium: 50,
    },
]

// Scoring algorithm
const scoreCrop = (crop: any, soilData: any): number => {
    let score = 0

    // Season match — 30 points
    if (crop.season === soilData.season) score += 30

    // pH match — 25 points
    if (soilData.ph >= crop.min_ph && soilData.ph <= crop.max_ph) score += 25

    // Soil type match — 20 points
    if (crop.suitable_soil.includes(soilData.soil_type)) score += 20

    // Nitrogen — 10 points
    if (soilData.nitrogen >= crop.min_nitrogen) score += 10

    // Phosphorus — 10 points
    if (soilData.phosphorus >= crop.min_phosphorus) score += 10

    // Potassium — 5 points
    if (soilData.potassium >= crop.min_potassium) score += 5

    return score
}

// Get recommendations
export const getRecommendations = async (req: Request, res: Response) => {
    try {
        const { farmer_id, soil_id, soil_type, ph, nitrogen, phosphorus, potassium, season } = req.body

        const soilData = { soil_type, ph, nitrogen, phosphorus, potassium, season }

        // Score all crops
        const scored = cropRequirements
            .map((crop) => ({
                crop_name: crop.name,
                suitability_score: scoreCrop(crop, soilData),
                reason: `Best suited for ${crop.season} season with ${crop.suitable_soil.join(' or ')} soil.`,
            }))
            .filter((c) => c.suitability_score > 0)
            .sort((a, b) => b.suitability_score - a.suitability_score)
            .slice(0, 3)

        // Save recommendations to database
        for (const rec of scored) {
            await pool.query(
                `INSERT INTO recommendations (farmer_id, soil_id, crop_name, suitability_score, reason)
         VALUES ($1, $2, $3, $4, $5)`,
                [farmer_id, soil_id, rec.crop_name, rec.suitability_score, rec.reason]
            )
        }

        res.json(scored)
    } catch (error) {
        res.status(500).json({ message: 'Error generating recommendations' })
    }
}

// Get saved recommendations by farmer
export const getRecommendationsByFarmer = async (req: Request, res: Response) => {
    try {
        const { farmer_id } = req.params
        const result = await pool.query(
            'SELECT * FROM recommendations WHERE farmer_id = $1 ORDER BY created_at DESC',
            [farmer_id]
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recommendations' })
    }
}