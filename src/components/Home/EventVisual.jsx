import { motion } from 'framer-motion'

export default function EventVisual() {
  return (
    <section id="updates" className="relative z-3 py-20 md:py-30" style={{ background: 'linear-gradient(180deg, #0b0605, #050303)' }}>
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto grid md:grid-cols-[1fr_.9fr] gap-12 md:gap-[70px] items-center">
        <motion.div initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative min-h-[380px] sm:min-h-[500px] md:min-h-[690px]">
          <img src="/newImages/ad39f1b0-230d-4815-ba80-874440e9c41b.png" alt="Unleashed event flyer" className="absolute left-[8%] top-0 w-[70%] rounded-[20px] sm:rounded-[28px] shadow-[0_35px_120px_rgba(0,0,0,.7)] border border-white/12 max-h-[320px] sm:max-h-[480px] md:max-h-[650px] object-cover -rotate-3 z-2" />
          <img src="/newImages/c0a68368-0073-4404-8fa4-5781d70c79fe.png" alt="Unleashed square promo" className="absolute right-[4%] bottom-2.5 w-[58%] rounded-[20px] sm:rounded-[28px] shadow-[0_35px_120px_rgba(0,0,0,.7)] border border-white/12 max-h-[300px] sm:max-h-[480px] md:max-h-[650px] object-cover rotate-5 brightness-[.65]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Flagship Gathering</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight mb-6 max-sm:text-4xl">UNLEASHED — September 2026, The Bahamas</h2>
          <p className="text-muted text-[17px] leading-relaxed">In a time marked by loss, confusion, and brokenness, this gathering is a call back to God's presence, power, and promise.</p>
          <div className="flex flex-col gap-3.5 my-7">
            {['A night of worship', 'A call to healing', 'An outpouring of His Spirit'].map(t => (
              <span key={t} className="flex items-center gap-3 text-[#f7e3cf] font-extrabold">
                <span className="w-2.5 h-2.5 rounded-full bg-orange shadow-[0_0_24px_var(--color-orange)]" />{t}
              </span>
            ))}
          </div>
          <a href="#booking" className="btn-shine inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] relative isolate overflow-hidden">RSVP / Join Waitlist</a>
        </motion.div>
      </div>
    </section>
  )
}
