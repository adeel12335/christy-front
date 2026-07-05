import { motion } from 'framer-motion'

export default function EventVisual() {
  return (
    <section id="updates" className="relative z-3 py-20 md:py-30" style={{ background: 'linear-gradient(180deg, #0b0605, #050303)' }}>
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Flagship Gathering</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-w-[820px] mx-auto max-sm:text-4xl">UNLEASHED — September 2026, The Bahamas</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,.6)]">
          <img src="/hero-worship-crowd.png" alt="Unleashed indoor arena worship" className="w-full h-[340px] sm:h-[480px] md:h-[560px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050303] via-[rgba(5,3,3,.85)] to-[rgba(5,3,3,.3)]" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16">
            <div className="max-w-[640px]">
              <p className="text-white/90 text-[17px] leading-relaxed mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,.8)]">In a time marked by loss, confusion, and brokenness, this gathering is a call back to God's presence, power, and promise.</p>
              <div className="flex flex-wrap gap-4 mb-7">
                {['A night of worship', 'A call to healing', 'An outpouring of His Spirit'].map(t => (
                  <span key={t} className="flex items-center gap-2.5 text-white font-extrabold text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,.7)]">
                    <span className="w-2 h-2 rounded-full bg-orange shadow-[0_0_24px_var(--color-orange)]" />{t}
                  </span>
                ))}
              </div>
              <a href="#rsvp" className="btn-shine inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] relative isolate overflow-hidden">RSVP / Join Waitlist</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
