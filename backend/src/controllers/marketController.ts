// backend/src/controllers/marketController.ts

import { Request, Response } from 'express'
import { getMarketPrices } from '../services/externalApiService'

export const getMarket = async (req: Request, res: Response) => {
    try {
        const { commodity, page = '1', limit = '20' } = req.query
        const prices = await getMarketPrices(
            commodity as string,
            Number(page),
            Number(limit)
        )
        if (prices.records.length === 0) {
            return res.status(404).json({ message: 'No market data found' })
        }

        res.json(prices)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching market prices' })
    }
}