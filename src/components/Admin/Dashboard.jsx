import { useState, useEffect } from 'react'
import { getStats } from '../../services/api'

const fallback = { totalBookings: 0, pendingBookings: 0, totalEvents: 0, unreadSubmissions: 0 }

export default function Dashboard() {
  const [stats, setStats] = useState(fallback)

  useEffect(() => {
    getStats().then(r => setStats(r.data)).catch(() => {})
  }, [])

  const cards = [
    { label: 'Total Bookings', value: stats.totalBookings, color: 'from-orange to-orange-2' },
    { label: 'Pending Bookings', value: stats.pendingBookings, color: 'from-amber to-yellow-500' },
    { label: 'Upcoming Events', value: stats.totalEvents, color: 'from-emerald-500 to-teal-500' },
    { label: 'Unread Messages', value: stats.unreadSubmissions, color: 'from-violet-500 to-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {cards.map(c => (
          <div key={c.label} className="bg-glass border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${c.color} opacity-10 rounded-bl-full`} />
            <p className="text-muted text-sm font-bold mb-2">{c.label}</p>
            <p className={`text-4xl font-black bg-gradient-to-br ${c.color} bg-clip-text text-transparent`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-glass border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/bookings" className="px-5 py-2.5 bg-orange/15 text-orange border border-orange/25 rounded-xl text-sm font-bold hover:bg-orange/25 transition-colors">View Bookings</a>
          <a href="/admin/events" className="px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Manage Events</a>
          <a href="/admin/submissions" className="px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Read Messages</a>
        </div>
      </div>
    </div>
  )
}
