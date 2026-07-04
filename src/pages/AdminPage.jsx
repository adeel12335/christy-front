import { Navigate, Routes, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AdminLayout from '../components/Admin/AdminLayout'
import Dashboard from '../components/Admin/Dashboard'
import BookingsManager from '../components/Admin/BookingsManager'
import EventsManager from '../components/Admin/EventsManager'
import SubmissionsManager from '../components/Admin/SubmissionsManager'
import SettingsManager from '../components/Admin/SettingsManager'

export default function AdminPage() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen grid place-items-center" style={{ background: '#050303' }}>
      <div className="w-8 h-8 border-2 border-transparent border-t-orange rounded-full" style={{ animation: 'spin .6s linear infinite' }} />
    </div>
  )

  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<BookingsManager />} />
        <Route path="events" element={<EventsManager />} />
        <Route path="submissions" element={<SubmissionsManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Route>
    </Routes>
  )
}
