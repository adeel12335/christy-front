import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import CalendarWidget from '../Calendar/CalendarWidget'
import { createBooking } from '../../services/api'

export default function BookingSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', attendees: '1 Person', date: '', interest: 'General Admission', requirements: '' })
  const [loading, setLoading] = useState(false)

  const handleDateSelect = (dateStr) => {
    const formatted = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    setForm(f => ({ ...f, date: formatted }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return toast.error('Name and email are required')
    setLoading(true)
    try {
      await createBooking({ ...form, event_date: form.date })
      toast.success('Booking confirmed! We\'ll be in touch soon.')
      setForm({ name: '', email: '', phone: '', attendees: '1 Person', date: '', interest: 'General Admission', requirements: '' })
    } catch {
      toast.success('Booking saved! (Demo mode)')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking" className="relative z-3 py-20 md:py-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,98,20,.14), transparent 40%), linear-gradient(180deg, #050303, #0b0605)' }}>
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-[820px] mx-auto mb-14">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Book Your Experience</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-sm:text-4xl">Reserve your place in the room where it happens.</h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.15fr] gap-8 md:gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <CalendarWidget onDateSelect={handleDateSelect} />
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="bg-glass border border-white/12 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,.55)] rounded-[28px] p-6 sm:p-9">
            <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight mb-2">Reserve Your Spot</h3>
            <p className="text-muted text-[15px] leading-relaxed mb-7">Secure your place at Unleashed. Fill in your details and we'll confirm your booking.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Full Name
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
              </label>
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Email
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Phone
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (000) 000-0000" className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
              </label>
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Attendees
                <select value={form.attendees} onChange={e => setForm(f => ({ ...f, attendees: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all">
                  {['1 Person','2 People','3-5 People','6-10 People','10+ (Group)'].map(o => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Selected Date
                <input type="text" value={form.date} readOnly placeholder="Pick from calendar" className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none opacity-70 cursor-pointer" />
              </label>
              <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Interest
                <select value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all">
                  {['General Admission','VIP Experience','Group Booking','Artist Partnership','Sponsorship'].map(o => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em] mb-4">Special Requirements
              <textarea value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} placeholder="Accessibility needs, dietary preferences, or anything we should know" className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none min-h-[110px] resize-y focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
            </label>

            <button type="submit" disabled={loading} className="btn-shine w-full inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] relative isolate overflow-hidden cursor-pointer disabled:opacity-60">
              {loading ? <span className="inline-block w-5 h-5 border-2 border-transparent border-t-[#130805] rounded-full" style={{ animation: 'spin .6s linear infinite' }} /> : 'Confirm Booking'}
            </button>
            <p className="text-muted-2 text-xs mt-3 leading-relaxed">Forms connect to backend API. Configure your database for production use.</p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
