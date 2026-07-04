import { useState, useEffect } from 'react'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api'
import toast from 'react-hot-toast'

const empty = { title: '', description: '', event_date: '', start_time: '', location: 'The Bahamas', status: 'upcoming' }

export default function EventsManager() {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(empty)

  const load = () => getEvents().then(r => setEvents(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(empty); setModal('new') }
  const openEdit = (ev) => { setForm({ title: ev.title, description: ev.description || '', event_date: ev.event_date?.slice(0, 10) || '', start_time: ev.start_time || '', location: ev.location || '', status: ev.status }); setModal(ev.id) }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title || !form.event_date) return toast.error('Title and date required')
    try {
      if (modal === 'new') await createEvent(form)
      else await updateEvent(modal, form)
      toast.success(modal === 'new' ? 'Event created' : 'Event updated')
      setModal(null)
      load()
    } catch { toast.error('Failed to save') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    try { await deleteEvent(id); toast.success('Deleted'); load() } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8 max-sm:flex-col max-sm:items-start">
        <h1 className="text-3xl font-bold">Events</h1>
        <button onClick={openNew} className="px-5 py-2.5 bg-gradient-to-br from-orange to-orange-2 text-[#130805] rounded-xl font-bold cursor-pointer">+ Add Event</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map(ev => (
          <div key={ev.id} className="bg-glass border border-white/10 rounded-2xl p-6 hover:border-orange/25 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold">{ev.title}</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ev.status === 'upcoming' ? 'bg-amber/20 text-amber' : ev.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-muted'}`}>{ev.status}</span>
            </div>
            <p className="text-muted text-sm mb-1">{ev.event_date?.slice(0, 10)} {ev.start_time ? `at ${ev.start_time.slice(0, 5)}` : ''}</p>
            <p className="text-muted text-sm mb-4">{ev.location || 'No location'}</p>
            {ev.description && <p className="text-muted text-sm mb-4 line-clamp-2">{ev.description}</p>}
            <div className="flex gap-2">
              <button onClick={() => openEdit(ev)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(ev.id)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-bold hover:bg-red-500/20 cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-muted col-span-full text-center py-12">No events yet. Create your first event.</p>}
      </div>

      {modal !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center p-5 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)}>
          <form onClick={e => e.stopPropagation()} onSubmit={handleSave} className="bg-[#0e0b0a] border border-white/12 rounded-[28px] p-8 w-full max-w-[520px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{modal === 'new' ? 'New Event' : 'Edit Event'}</h2>

            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em] mb-4">Title
              <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all" />
            </label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Date
                <input type="date" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all" />
              </label>
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Start Time
                <input type="time" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Location
                <input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all" />
              </label>
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Status
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all">
                  {['upcoming','active','completed','cancelled'].map(s => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em] mb-6">Description
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none min-h-[100px] resize-y focus:border-orange/70 transition-all" />
            </label>

            <div className="flex gap-3">
              <button type="submit" className="flex-1 min-h-[48px] rounded-full font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] cursor-pointer">Save</button>
              <button type="button" onClick={() => setModal(null)} className="px-6 min-h-[48px] rounded-full font-bold border border-white/15 hover:bg-white/5 cursor-pointer">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
