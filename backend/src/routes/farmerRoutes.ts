// backend/src/routes/farmerRoutes.ts

import { Router } from 'express'
import {
    getFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    updateProfile,
    getProfile,
} from '../controllers/farmerController'

const router = Router()

router.get('/', getFarmers)
router.get('/:id', getFarmerById)
router.post('/', createFarmer)
router.put('/:id', updateFarmer)
router.delete('/:id', deleteFarmer)
router.get('/profile/:id', getProfile)
router.put('/profile/:id', updateProfile)

export default router