// backend/server.ts

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

import app from './src/app'
import { env } from './src/config/env'

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
})