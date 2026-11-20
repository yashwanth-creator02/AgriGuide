// backend/src/routes/farmerRoutes.ts

import { Router } from 'express'
import {
    getFarmers,
    getFarmerById,
    updateFarmer,
    deleteFarmer,
    updateProfile,
    getProfile,
} from '../controllers/farmerController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get('/', getFarmers)
router.get('/:id', getFarmerById)
router.put('/:id', authMiddleware, updateFarmer)
router.delete('/:id', authMiddleware, deleteFarmer)
router.get('/profile/:id', getProfile)
router.put('/profile/:id', authMiddleware, updateProfile)

export default router
