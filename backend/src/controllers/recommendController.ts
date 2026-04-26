// backend/src/controllers/recommendController.ts

import { Request, Response } from 'express'
import pool from '../config/db'
import { getAllCrops } from '../services/cropService'
import { generateRecommendations } from '../services/recommendService'

// Get recommendations
export const getRecommendations = async (req: Request, res: Response) => {
    try {
        const { farmer_id, soil_id, soil_type, ph, nitrogen, phosphorus, potassium, season } = req.body

        const soilData = { soil_type, ph, nitrogen, phosphorus, potassium, season }

        // Fetch crops from database
        const cropsFromDb = await getAllCrops()

        // Generate recommendations
        const scored = generateRecommendations(soilData, farmer_id, cropsFromDb)

        if (scored.length === 0) {
            return res.status(404).json({ message: 'No suitable crops found for the given soil data' })
        }

        // Save recommendations to database with soil_snapshot
        for (const rec of scored) {
            await pool.query(
                `INSERT INTO recommendations 
          (farmer_id, soil_id, crop_name, suitability_score, reason, soil_snapshot)
         VALUES ($1, $2, $3, $4, $5, $6)`,
                [farmer_id, soil_id, rec.crop_name, rec.suitability_score, rec.reason, rec.soil_snapshot]
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