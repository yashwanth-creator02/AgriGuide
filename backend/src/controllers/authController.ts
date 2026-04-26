// backend/src/controllers/authController.ts

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db'
import { env } from '../config/env'

// Signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, location } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' })
        }

        // Check if email already exists
        const existing = await pool.query('SELECT * FROM farmers WHERE email = $1', [email])
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Save farmer
        const result = await pool.query(
            'INSERT INTO farmers (name, email, password, phone, location) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, location',
            [name, email, hashedPassword, phone || '', location || '']
        )

        const farmer = result.rows[0]

        // Generate token
        const token = jwt.sign(
            { id: farmer.id, email: farmer.email },
            env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({ token, user: farmer })
    } catch (error) {
        console.error('Signup error:', error)
        res.status(500).json({ message: 'Error creating account' })
    }
}

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        // Find farmer
        const result = await pool.query('SELECT * FROM farmers WHERE email = $1', [email])
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const farmer = result.rows[0]

        // Check password
        const isMatch = await bcrypt.compare(password, farmer.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Generate token
        const token = jwt.sign(
            { id: farmer.id, email: farmer.email },
            env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            token,
            user: { id: farmer.id, name: farmer.name, email: farmer.email, phone: farmer.phone, location: farmer.location }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Error logging in' })
    }
}

// Get current farmer
export const getMe = async (req: Request, res: Response) => {
    try {
        const farmerId = (req as any).user.id
        const result = await pool.query(
            'SELECT id, name, email, phone, location, created_at FROM farmers WHERE id = $1',
            [farmerId]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmer' })
    }
}