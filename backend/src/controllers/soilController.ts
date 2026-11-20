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
    try {
        const authUser = (req as any).user
        const { farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season } = req.body
        const resolvedFarmerId = authUser?.id || farmer_id

        if (!resolvedFarmerId) {
            return res.status(400).json({ message: 'Farmer ID is required' })
        }

        const result = await pool.query(
            `INSERT INTO soil_data 
        (farmer_id, soil_type, ph, nitrogen, phosphorus, potassium, location, season) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
            [resolvedFarmerId, soil_type, ph, nitrogen, phosphorus, potassium, location, season]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Save soil data error:', error)
        res.status(500).json({ message: 'Error saving soil data' })
    }
}

// Delete soil data (with farmer ownership check if authenticated)
export const deleteSoilData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const authUser = (req as any).user

        let query = 'DELETE FROM soil_data WHERE id = $1'
        const params: any[] = [id]

        if (authUser) {
            query += ' AND farmer_id = $2'
            params.push(authUser.id)
        }

        const result = await pool.query(query + ' RETURNING id', params)
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Soil entry not found or unauthorized' })
        }
        res.json({ message: 'Soil data deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting soil data' })
    }
}

// Get soil data with recommendations by farmer (O(1) query complexity instead of N+1)
export const getSoilWithRecommendations = async (req: Request, res: Response) => {
    try {
        const { farmer_id } = req.params

        const soilResult = await pool.query(
            'SELECT * FROM soil_data WHERE farmer_id = $1 ORDER BY created_at DESC',
            [farmer_id]
        )

        if (soilResult.rows.length === 0) {
            return res.json([])
        }

        const soilIds = soilResult.rows.map((s) => s.id)
        const recResult = await pool.query(
            'SELECT * FROM recommendations WHERE soil_id = ANY($1) ORDER BY suitability_score DESC',
            [soilIds]
        )

        const recsBySoilId = new Map<number, any[]>()
        for (const rec of recResult.rows) {
            const sid = rec.soil_id
            if (!recsBySoilId.has(sid)) {
                recsBySoilId.set(sid, [])
            }
            recsBySoilId.get(sid)!.push(rec)
        }

        const history = soilResult.rows.map((soil) => ({
            ...soil,
            recommendations: recsBySoilId.get(soil.id) || [],
        }))

        res.json(history)
    } catch (error) {
        console.error('History error:', error)
        res.status(500).json({ message: 'Error fetching history' })
    }
}

// Backward-compatible alias
export const deleteSoilEntry = deleteSoilData
