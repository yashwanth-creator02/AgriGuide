// backend/src/app.ts

import express from 'express'
import cors from 'cors'
import farmerRoutes from './routes/farmerRoutes'
import soilRoutes from './routes/soilRoutes'
import weatherRoutes from './routes/weatherRoutes'
import recommendRoutes from './routes/recommendRoutes'
import cropRoutes from './routes/cropRoutes'
import { errorHandler } from './middleware/errorHandler'
import marketRoutes from './routes/marketRoutes'


const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/farmers', farmerRoutes)
app.use('/api/soil', soilRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/recommendations', recommendRoutes)
app.use('/api/crops', cropRoutes)
app.use('/api/market', marketRoutes)

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'AgriGuide API is running!' })
})

app.use(errorHandler)

export default app