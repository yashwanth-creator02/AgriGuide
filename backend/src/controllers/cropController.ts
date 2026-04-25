// backend/src/controllers/cropController.ts

import { Request, Response } from 'express'
import { getAllCrops, getCropDetails } from '../services/cropService'

// Get all crops
export const getCrops = async (req: Request, res: Response) => {
    try {
        res.json(getAllCrops())
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crops' })
    }
}

// Get crop by name
export const getCropByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params
        const crop = getCropDetails(name as string)
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' })
        }
        res.json(crop)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crop' })
    }
}