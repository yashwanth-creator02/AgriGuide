// backend/src/services/cropService.ts

import pool from '../config/db'

export const getAllCrops = async () => {
    const result = await pool.query('SELECT * FROM crops ORDER BY name')
    return result.rows
}

export const getCropDetails = async (name: string) => {
    const result = await pool.query(
        'SELECT * FROM crops WHERE LOWER(name) = LOWER($1)',
        [name]
    )
    return result.rows[0] || null
}

export const getCropById = async (id: number) => {
    const result = await pool.query('SELECT * FROM crops WHERE id = $1', [id])
    return result.rows[0] || null
}