// backend/src/controllers/pestController.ts

import { Request, Response } from 'express'
import pool from '../config/db'

// Get all pest alerts
export const getPestAlerts = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
      SELECT 
        p.id,
        p.pest_name,
        p.affected_crop,
        p.region,
        p.severity,
        p.description,
        p.image_url,
        p.created_at,
        c.name as crop_name,
        c.image_url as crop_image_url
      FROM pest_alerts p
      LEFT JOIN crops c ON p.crop_id = c.id
      ORDER BY 
        CASE p.severity 
          WHEN 'High' THEN 1 
          WHEN 'Medium' THEN 2 
          WHEN 'Low' THEN 3 
        END,
        p.created_at DESC
    `)
        res.json(result.rows)
    } catch (error) {
        console.error('Pest alerts error:', error)
        res.status(500).json({ message: 'Error fetching pest alerts' })
    }
}

// Get pest alerts by severity
export const getPestAlertsBySeverity = async (req: Request, res: Response) => {
    try {
        const { severity } = req.params
        const result = await pool.query(
            `SELECT p.*, c.name as crop_name 
       FROM pest_alerts p
       LEFT JOIN crops c ON p.crop_id = c.id
       WHERE p.severity = $1
       ORDER BY p.created_at DESC`,
            [severity]
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pest alerts' })
    }
}

// Get pest alerts by crop
export const getPestAlertsByCrop = async (req: Request, res: Response) => {
    try {
        const { crop_id } = req.params
        const result = await pool.query(
            `SELECT p.*, c.name as crop_name 
       FROM pest_alerts p
       LEFT JOIN crops c ON p.crop_id = c.id
       WHERE p.crop_id = $1
       ORDER BY p.created_at DESC`,
            [crop_id]
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pest alerts' })
    }
}