// backend/src/controllers/farmerController.ts

import { Request, Response } from 'express'
import pool from '../config/db'
import { Farmer } from '../types'

// Get all farmers
export const getFarmers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM farmers ORDER BY created_at DESC')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmers' })
    }
}

// Get farmer by id
export const getFarmerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM farmers WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmer' })
    }
}

// Create farmer
export const createFarmer = async (req: Request, res: Response) => {
    try {
        const { name, phone, location } = req.body
        const result = await pool.query(
            'INSERT INTO farmers (name, phone, location) VALUES ($1, $2, $3) RETURNING *',
            [name, phone, location]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error creating farmer' })
    }
}

// Update farmer
export const updateFarmer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, phone, location } = req.body
        const result = await pool.query(
            'UPDATE farmers SET name = $1, phone = $2, location = $3 WHERE id = $4 RETURNING *',
            [name, phone, location, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error updating farmer' })
    }
}

// Delete farmer
export const deleteFarmer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM farmers WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json({ message: 'Farmer deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting farmer' })
    }
}

// updates farmers(users) profiles.
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, phone, location } = req.body

        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }

        const result = await pool.query(
            `UPDATE farmers 
       SET name = $1, phone = $2, location = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 
       RETURNING id, name, email, phone, location, created_at`,
            [name, phone, location, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Update profile error:', error)
        res.status(500).json({ message: 'Error updating profile' })
    }
}

// gets profile details.
export const getProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const farmer = await pool.query(
            'SELECT id, name, email, phone, location, created_at FROM farmers WHERE id = $1',
            [id]
        )

        if (farmer.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }

        const soilCount = await pool.query(
            'SELECT COUNT(*) FROM soil_data WHERE farmer_id = $1',
            [id]
        )

        const recCount = await pool.query(
            'SELECT COUNT(*) FROM recommendations WHERE farmer_id = $1',
            [id]
        )

        res.json({
            ...farmer.rows[0],
            total_analyses: parseInt(soilCount.rows[0].count),
            total_recommendations: parseInt(recCount.rows[0].count),
        })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' })
    }
}