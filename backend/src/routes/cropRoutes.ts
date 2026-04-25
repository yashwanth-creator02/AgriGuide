// backend/src/routes/cropRoutes.ts

import { Router } from 'express'
import { getCrops, getCropByName } from '../controllers/cropController'

const router = Router()

router.get('/', getCrops)
router.get('/:name', getCropByName)

export default router