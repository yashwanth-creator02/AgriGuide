// frontend/src/services/authService.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const signup = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message || 'Signup failed')
  }
  return response.json()
}

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message || 'Login failed')
  }
  return response.json()
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getToken = () => localStorage.getItem('token')

export const getUser = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export const getFarmerId = (): number | null => {
  const user = getUser()
  return user?.id ?? null
}

export const isLoggedIn = () => !!getToken()

export const getAuthHeaders = (): Record<string, string> => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
