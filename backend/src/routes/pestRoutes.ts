// backend/src/routes/pestRoutes.ts

import { Router } from 'express'
import {
    getPestAlerts,
    getPestAlertsBySeverity,
    getPestAlertsByCrop,
} from '../controllers/pestController'

const router = Router()

router.get('/', getPestAlerts)
router.get('/severity/:severity', getPestAlertsBySeverity)
router.get('/crop/:crop_id', getPestAlertsByCrop)

export default router