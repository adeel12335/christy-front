import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Enter email and password')
    setLoading(true)
    try {
      await loginUser(email, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-5" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,98,20,.08), transparent 50%), #050303' }}>
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl tracking-tight">UNLEASHED</h1>
          <p className="text-muted mt-2">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-glass border border-white/12 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,.55)] rounded-[28px] p-8">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>

          <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em] mb-4">Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@unleashed.com" required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
          </label>

          <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em] mb-6">Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
          </label>

          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] cursor-pointer disabled:opacity-60">
            {loading ? <span className="inline-block w-5 h-5 border-2 border-transparent border-t-[#130805] rounded-full" style={{ animation: 'spin .6s linear infinite' }} /> : 'Login'}
          </button>
        </form>

        <p className="text-center text-muted-2 text-xs mt-6">
          <a href="/" className="hover:text-orange transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  )
}
