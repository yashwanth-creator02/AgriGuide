// backend/src/controllers/marketController.ts

import { Request, Response } from 'express'
import { getMarketPrices } from '../services/externalApiService'

export const getMarket = async (req: Request, res: Response) => {
    try {
        const { commodity } = req.query
        const prices = await getMarketPrices(commodity as string)

        if (prices.length === 0) {
            return res.status(404).json({ message: 'No market data found' })
        }

        res.json(prices)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching market prices' })
    }
}