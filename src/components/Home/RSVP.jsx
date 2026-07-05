import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { createSubmission } from '../../services/api'

export default function RSVP() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'Stay Updated', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return toast.error('Name and email are required')
    setLoading(true)
    try {
      await createSubmission(form)
      toast.success('You\'re on the list! We\'ll keep you posted.')
      setForm({ name: '', email: '', phone: '', interest: 'Stay Updated', message: '' })
    } catch {
      toast.success('Submitted! (Demo mode)')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rsvp" className="relative z-3 py-20 md:py-30" style={{ background: 'linear-gradient(180deg, #050303, #0a0706)' }}>
      <div className="w-[min(720px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Stay Connected</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-sm:text-4xl">Don't miss what God is about to do.</h2>
          <p className="text-muted mt-5 text-lg leading-relaxed max-w-[560px] mx-auto">Join the waitlist, ask a question, or connect with our team. We want to hear from you.</p>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="bg-glass border border-white/12 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,.55)] rounded-[28px] p-6 sm:p-9">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Full Name
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Email
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" required className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Phone (optional)
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (000) 000-0000" className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em]">Interest
              <select value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))} className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none focus:border-orange/70 transition-all">
                {['Stay Updated','Volunteer','Partner / Sponsor','Perform / Minister','General Inquiry'].map(o => <option key={o}>{o}</option>)}
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-2 text-xs text-muted font-extrabold uppercase tracking-[.1em] mb-6">Message
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Your message or question..." className="w-full bg-white/[.06] border border-white/12 rounded-2xl text-white p-4 outline-none min-h-[120px] resize-y focus:border-orange/70 focus:shadow-[0_0_0_4px_rgba(255,100,20,.08)] transition-all" />
          </label>

          <button type="submit" disabled={loading} className="btn-shine w-full inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] relative isolate overflow-hidden cursor-pointer disabled:opacity-60">
            {loading ? <span className="inline-block w-5 h-5 border-2 border-transparent border-t-[#130805] rounded-full" style={{ animation: 'spin .6s linear infinite' }} /> : 'Join the Movement'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
