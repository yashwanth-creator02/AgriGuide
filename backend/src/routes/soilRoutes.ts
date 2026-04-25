// backend/src/routes/soilRoutes.ts

import { Router } from 'express'
import {
    getSoilData,
    getSoilDataByFarmer,
    createSoilData,
    deleteSoilData,
} from '../controllers/soilController'

const router = Router()

router.get('/', getSoilData)
router.get('/farmer/:farmer_id', getSoilDataByFarmer)
router.post('/', createSoilData)
router.delete('/:id', deleteSoilData)

export default router