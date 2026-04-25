// backend/src/routes/marketRoutes.ts

import { Router } from 'express'
import { getMarket } from '../controllers/marketController'

const router = Router()

router.get('/', getMarket)

export default router