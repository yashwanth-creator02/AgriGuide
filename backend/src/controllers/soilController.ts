// backend/src/controllers/soilController.ts

import { Request, Response } from 'express'
import pool from '../config/db'

// Get all soil data
export const getSoilData = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM soil_data ORDER BY created_at DESC')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching soil data' })
    }
}

// Get soil data by farmer id
export const getSoilDataByFarmer = async (req: Request, res: Response) => {
    try {
        const { farmer_id } = req.params
        const result = await pool.query(
            'SELECT * FROM soil_data WHERE farmer_id = $1 ORDER BY created_at DESC',
            [farmer_id]
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching soil data' })
    }
}

// Create soil data
export const createSoilData = async (req: Request, res: Response) => {
    console.log('Soil data received:', req.body)
    try {
        const { farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season } = req.body
        const result = await pool.query(
            `INSERT INTO soil_data 
        (farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
            [farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error saving soil data' })
    }
}

// Delete soil data
export const deleteSoilData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM soil_data WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Soil data not found' })
        }
        res.json({ message: 'Soil data deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting soil data' })
    }
}

// Get soil data with recommendations by farmer
export const getSoilWithRecommendations = async (req: Request, res: Response) => {
    try {
        const { farmer_id } = req.params

        const soilResult = await pool.query(
            'SELECT * FROM soil_data WHERE farmer_id = $1 ORDER BY created_at DESC',
            [farmer_id]
        )

        const history = await Promise.all(
            soilResult.rows.map(async (soil) => {
                const recResult = await pool.query(
                    'SELECT * FROM recommendations WHERE soil_id = $1 ORDER BY suitability_score DESC',
                    [soil.id]
                )
                return {
                    ...soil,
                    recommendations: recResult.rows,
                }
            })
        )

        res.json(history)
    } catch (error) {
        console.error('History error:', error)
        res.status(500).json({ message: 'Error fetching history' })
    }
}

export const deleteSoilEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // Delete recommendations first (cascade should handle this but let's be explicit)
        await pool.query('DELETE FROM recommendations WHERE soil_id = $1', [id])

        // Delete soil entry
        const result = await pool.query(
            'DELETE FROM soil_data WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Soil entry not found' })
        }

        res.json({ message: 'Entry deleted successfully' })
    } catch (error) {
        console.error('Delete soil error:', error)
        res.status(500).json({ message: 'Error deleting entry' })
    }
}