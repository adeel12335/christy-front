import { useState, useEffect } from 'react'
import { getBookings, updateBooking, deleteBooking } from '../../services/api'
import toast from 'react-hot-toast'

const statusColors = { pending: 'bg-amber/20 text-amber', approved: 'bg-emerald-500/20 text-emerald-400', rejected: 'bg-red-500/20 text-red-400' }

export default function BookingsManager() {
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')

  const load = () => getBookings().then(r => setBookings(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleStatus = async (id, status) => {
    try {
      await updateBooking(id, { status })
      toast.success(`Booking ${status}`)
      load()
    } catch { toast.error('Failed to update') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return
    try {
      await deleteBooking(id)
      toast.success('Deleted')
      load()
    } catch { toast.error('Failed to delete') }
  }

  const filtered = bookings.filter(b =>
    [b.name, b.email, b.status].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8 max-sm:flex-col max-sm:items-start">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="bg-white/[.06] border border-white/12 rounded-xl text-white px-4 py-2.5 outline-none focus:border-orange/70 w-[280px] max-sm:w-full" />
      </div>

      <div className="admin-table-wrap bg-glass border border-white/10 rounded-2xl overflow-hidden">
        <table className="admin-table w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-muted text-xs uppercase tracking-wider">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4 max-sm:hidden">Email</th>
              <th className="text-left p-4 max-md:hidden">Date</th>
              <th className="text-left p-4 max-md:hidden">Attendees</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted">No bookings found</td></tr>
            )}
            {filtered.map(b => (
              <tr key={b.id} className="border-b border-white/5 hover:bg-white/[.03] transition-colors">
                <td className="p-4 font-bold">{b.name}</td>
                <td className="p-4 text-muted max-sm:hidden">{b.email}</td>
                <td className="p-4 text-muted max-md:hidden">{b.event_date || '—'}</td>
                <td className="p-4 text-muted max-md:hidden">{b.attendees || '—'}</td>
                <td className="p-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[b.status] || statusColors.pending}`}>{b.status}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-1.5 justify-end">
                    {b.status !== 'approved' && <button onClick={() => handleStatus(b.id, 'approved')} className="px-3 py-1.5 bg-emerald-500/15 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500/25 cursor-pointer">Approve</button>}
                    {b.status !== 'rejected' && <button onClick={() => handleStatus(b.id, 'rejected')} className="px-3 py-1.5 bg-red-500/15 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/25 cursor-pointer">Reject</button>}
                    <button onClick={() => handleDelete(b.id)} className="px-3 py-1.5 bg-white/5 text-muted rounded-lg text-xs font-bold hover:bg-white/10 cursor-pointer">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
