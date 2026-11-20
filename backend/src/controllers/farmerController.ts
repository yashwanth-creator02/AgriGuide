// backend/src/controllers/farmerController.ts

import { Request, Response } from 'express'
import pool from '../config/db'

// Get all farmers (public directory - safe fields only)
export const getFarmers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'SELECT id, name, email, phone, location, created_at FROM farmers ORDER BY created_at DESC'
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmers' })
    }
}

// Get farmer by id (safe fields only)
export const getFarmerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'SELECT id, name, email, phone, location, created_at FROM farmers WHERE id = $1',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmer' })
    }
}

// Get profile of farmer
export const getProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'SELECT id, name, email, phone, location, created_at FROM farmers WHERE id = $1',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' })
    }
}

// Update profile
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const authUser = (req as any).user

        // If authenticated, enforce that the user can only update their own profile
        if (authUser && Number(authUser.id) !== Number(id)) {
            return res.status(403).json({ message: 'Unauthorized to update this profile' })
        }

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
        res.status(500).json({ message: 'Error updating profile' })
    }
}

// Update farmer
export const updateFarmer = updateProfile

// Delete farmer
export const deleteFarmer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const authUser = (req as any).user

        if (authUser && Number(authUser.id) !== Number(id)) {
            return res.status(403).json({ message: 'Unauthorized to delete this account' })
        }

        const result = await pool.query('DELETE FROM farmers WHERE id = $1 RETURNING id', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json({ message: 'Farmer deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting farmer' })
    }
}
