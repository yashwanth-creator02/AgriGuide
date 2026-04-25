// backend/src/controllers/authController.ts

import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db'
import { env } from '../config/env'

// Signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Check if user already exists
        const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Save user
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        )

        const user = result.rows[0]

        // Generate token
        const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.status(201).json({ token, user })
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

        // Find user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const user = result.rows[0]

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Generate token
        const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Error logging in' })
    }
}

// Get current user
export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const result = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id = $1',
            [userId]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' })
    }
}