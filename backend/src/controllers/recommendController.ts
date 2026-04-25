// backend/src/controllers/recommendController.ts

import { Request, Response } from 'express'
import pool from '../config/db'
import { generateRecommendations } from '../services/recommendService'

// Simple crop database for scoring logic

// Get recommendations
export const getRecommendations = async (req: Request, res: Response) => {
    try {
        const { farmer_id, soil_id, soil_type, ph, nitrogen, phosphorus, potassium, season } = req.body

        const soilData = { soil_type, ph, nitrogen, phosphorus, potassium, season }

        // Score all crops
        const scored = generateRecommendations(soilData)
        console.log('Scored crops:', scored)
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
        console.error('Recommendation error:', error)
        res.status(500).json({ message: 'Error generating recommendations', error: String(error) })
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