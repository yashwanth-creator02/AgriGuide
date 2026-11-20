// backend/src/routes/weatherRoutes.ts

import { Router } from 'express'
import { getWeather, reverseGeocode } from '../controllers/weatherController'

const router = Router()

router.get('/', getWeather)
router.get('/reverse', reverseGeocode)

export default router
