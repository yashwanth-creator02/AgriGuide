// backend/src/routes/recommendRoutes.ts

import { Router } from 'express'
import {
    getRecommendations,
    getRecommendationsByFarmer,
} from '../controllers/recommendController'

const router = Router()

router.post('/', getRecommendations)
router.get('/farmer/:farmer_id', getRecommendationsByFarmer)

export default router