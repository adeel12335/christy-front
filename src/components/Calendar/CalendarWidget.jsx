import { useState, useEffect } from 'react'
import { getEvents } from '../../services/api'

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

const FALLBACK_EVENTS = [
  { event_date: '2026-09-18', title: 'Unleashed Day 1 — Doors & Worship', start_time: '18:00' },
  { event_date: '2026-09-19', title: 'Unleashed Day 2 — Word & Ministry', start_time: '17:00' },
  { event_date: '2026-09-20', title: 'Unleashed Day 3 — Outpouring & Encounter', start_time: '16:00' },
]

export default function CalendarWidget({ onDateSelect }) {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(8)
  const [selected, setSelected] = useState(null)
  const [events, setEvents] = useState(FALLBACK_EVENTS)

  useEffect(() => {
    getEvents().then(r => { if (r.data?.length) setEvents(r.data) }).catch(() => {})
  }, [])

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const today = new Date()

  const eventDates = events.map(e => e.event_date)

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const handleSelect = (dateStr) => {
    setSelected(dateStr)
    const evt = events.find(e => e.event_date === dateStr)
    onDateSelect?.(dateStr, evt)
  }

  const days = []
  for (let i = firstDay - 1; i >= 0; i--) days.push({ day: daysInPrev - i, other: true })
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({ day: d, dateStr, isEvent: eventDates.includes(dateStr), isToday: today.getFullYear() === year && today.getMonth() === month && today.getDate() === d, isSelected: selected === dateStr })
  }
  const remaining = (firstDay + daysInMonth) % 7 === 0 ? 0 : 7 - ((firstDay + daysInMonth) % 7)
  for (let i = 1; i <= remaining; i++) days.push({ day: i, other: true })

  const selectedEvent = selected ? events.find(e => e.event_date === selected) : null

  return (
    <div className="bg-glass border border-white/12 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,.55)] rounded-[28px] p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={prev} className="w-11 h-11 rounded-full border border-white/15 bg-white/[.06] text-white text-lg grid place-items-center cursor-pointer hover:bg-white/12 hover:border-orange/40 transition-all">←</button>
        <h3 className="text-xl sm:text-[22px] font-extrabold">{MONTH_NAMES[month]} {year}</h3>
        <button onClick={next} className="w-11 h-11 rounded-full border border-white/15 bg-white/[.06] text-white text-lg grid place-items-center cursor-pointer hover:bg-white/12 hover:border-orange/40 transition-all">→</button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <span key={d} className="text-xs uppercase tracking-[.1em] text-muted-2 py-2 font-bold">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <button key={i} disabled={d.other} onClick={() => !d.other && handleSelect(d.dateStr)} className={`aspect-square grid place-items-center rounded-[14px] text-[15px] font-bold cursor-pointer border transition-all relative ${d.other ? 'text-muted-2 opacity-40 pointer-events-none border-transparent' : 'border-transparent hover:bg-white/8'} ${d.isToday ? 'border-amber!' : ''} ${d.isEvent ? 'bg-orange/15 text-orange border-orange/35!' : ''} ${d.isSelected ? 'bg-orange! text-[#130805]! border-orange! shadow-[0_6px_24px_rgba(255,91,21,.35)]' : ''}`}>
            {d.day}
            {d.isEvent && !d.isSelected && <span className="absolute bottom-[5px] w-[5px] h-[5px] bg-orange rounded-full shadow-[0_0_10px_var(--color-orange)]" />}
          </button>
        ))}
      </div>

      <div className="flex gap-5 mt-5 pt-4 border-t border-white/8">
        <span className="flex items-center gap-2 text-[13px] text-muted"><i className="w-2.5 h-2.5 bg-orange rounded-full shadow-[0_0_10px_var(--color-orange)]" />Event Dates</span>
        <span className="flex items-center gap-2 text-[13px] text-muted"><i className="w-2.5 h-2.5 bg-amber rounded-full" />Selected</span>
      </div>

      <div className="mt-4 p-4 bg-white/[.04] rounded-2xl border border-white/8">
        {selectedEvent ? (
          <>
            <p className="text-amber font-extrabold">{selectedEvent.title}</p>
            <p className="text-muted text-sm mt-1">{new Date(selected + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} &bull; Starts at {selectedEvent.start_time?.slice(0, 5) || 'TBA'}</p>
            <p className="text-muted text-sm">The Bahamas &bull; Powered by Plugged in Faith</p>
          </>
        ) : selected ? (
          <p className="text-muted text-sm">{new Date(selected + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} — No scheduled event on this date.</p>
        ) : (
          <p className="text-muted text-sm">Select a date to see event details</p>
        )}
      </div>
    </div>
  )
}
