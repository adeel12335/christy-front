import { createContext, useState, useEffect } from 'react'
import { getMe } from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('unleashed_token')
    if (token) {
      getMe().then(r => setUser(r.data.user)).catch(() => localStorage.removeItem('unleashed_token')).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const loginUser = (token, userData) => {
    localStorage.setItem('unleashed_token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('unleashed_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
