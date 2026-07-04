import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#160d0a', color: '#fff8ef', border: '1px solid rgba(255,255,255,.12)' } }} />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
