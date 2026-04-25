// backend/src/middleware/validateRequest.ts

import { Request, Response, NextFunction } from 'express'

export const validateSoilInput = (req: Request, res: Response, next: NextFunction) => {
    const { soil_type, ph, nitrogen, phosphorus, potassium, season } = req.body

    if (!soil_type || !ph || !nitrogen || !phosphorus || !potassium || !season) {
        return res.status(400).json({ message: 'All soil fields are required' })
    }

    if (ph < 0 || ph > 14) {
        return res.status(400).json({ message: 'pH must be between 0 and 14' })
    }

    next()
}

export const validateFarmerInput = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ message: 'Farmer name is required' })
    }

    next()
}