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
import authRoutes from './routes/authRoutes'
import pestRoutes from './routes/pestRoutes'


const app = express()

const allowedOrigins = [
    'https://agri-guide-nine.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())

// Routes
app.use('/api/farmers', farmerRoutes)
app.use('/api/soil', soilRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/recommendations', recommendRoutes)
app.use('/api/crops', cropRoutes)
app.use('/api/market', marketRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/pests', pestRoutes)

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'AgriGuide API is running!' })
})

app.use(errorHandler)

export default app