import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/bookings', label: 'Bookings', icon: '📋' },
  { to: '/admin/events', label: 'Events', icon: '🎤' },
  { to: '/admin/submissions', label: 'Submissions', icon: '✉️' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex" style={{ background: '#050303' }}>
      <aside className="w-[260px] border-r border-white/8 bg-white/[.02] flex flex-col max-md:w-[70px]">
        <div className="p-6 border-b border-white/8 max-md:p-3 max-md:text-center">
          <h1 className="font-display text-xl tracking-tight max-md:text-sm">UNLEASHED</h1>
          <p className="text-muted text-xs mt-1 max-md:hidden">Plugged in Faith — Admin</p>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all max-md:justify-center max-md:px-2 ${isActive ? 'bg-orange/15 text-orange border border-orange/25' : 'text-muted hover:bg-white/5 hover:text-white border border-transparent'}`}>
              <span className="text-lg">{l.icon}</span>
              <span className="max-md:hidden">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/8 max-md:p-2">
          <p className="text-xs text-muted mb-2 max-md:hidden truncate">{user?.email}</p>
          <button onClick={logout} className="w-full text-left text-sm text-red-400 hover:text-red-300 font-bold cursor-pointer max-md:text-center">Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
