// backend/src/routes/soilRoutes.ts

import { Router } from 'express'
import { getSoilData, getSoilDataByFarmer, createSoilData, deleteSoilData, getSoilWithRecommendations, deleteSoilEntry } from '../controllers/soilController'

const router = Router()

router.get('/', getSoilData)
router.get('/farmer/:farmer_id', getSoilDataByFarmer)
router.post('/', createSoilData)
router.delete('/:id', deleteSoilData)
router.get('/history/:farmer_id', getSoilWithRecommendations)
router.delete('/history/:id', deleteSoilEntry)

export default router