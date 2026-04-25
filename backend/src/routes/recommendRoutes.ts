// backend/src/routes/recommendRoutes.ts

import { Router } from 'express'
import {
    getRecommendations,
    getRecommendationsByFarmer,
} from '../controllers/recommendController'
import { validateSoilInput } from '../middleware/validateRequest'

const router = Router()

router.post('/', validateSoilInput, getRecommendations)
router.get('/farmer/:farmer_id', getRecommendationsByFarmer)

export default router