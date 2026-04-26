// frontend/src/services/authService.ts

const API_URL = import.meta.env.VITE_API_URL

export const signup = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message)
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
    throw new Error(err.message)
  }
  return response.json()
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('farmer_id')
}

export const getToken = () => localStorage.getItem('token')

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getFarmerId = () => {
  const user = getUser()
  return user ? user.id : 1
}

export const isLoggedIn = () => !!getToken()
