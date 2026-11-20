// backend/src/config/env.ts

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const isProduction = process.env.NODE_ENV === 'production'
const jwtSecret = process.env.JWT_SECRET

if (isProduction && !jwtSecret) {
    throw new Error('FATAL: JWT_SECRET environment variable is required in production')
}

export const env = {
    PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'agriguide',
    MARKET_API_KEY: process.env.MARKET_API_KEY || '',
    JWT_SECRET: jwtSecret || 'dev_insecure_jwt_secret_change_in_production',
}
