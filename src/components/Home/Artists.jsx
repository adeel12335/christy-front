import { motion } from 'framer-motion'

export default function Artists() {
  return (
    <section id="artists" className="relative z-3 py-20 md:py-30 overflow-hidden">
      <div className="absolute inset-0 -z-1">
        <img src="/artists-banner.png" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050303 0%, transparent 20%, transparent 80%, #050303 100%)' }} />
      </div>

      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-[820px] mx-auto">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Artists & Speakers</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-sm:text-4xl mb-6">Carriers of the fire.</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .2 }} className="max-w-[640px] mx-auto text-center mt-8">
          <div className="bg-glass border border-white/12 backdrop-blur-3xl rounded-[28px] p-10 md:p-14">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange/10 border border-orange/25 grid place-items-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange">
                <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-3">To Be Announced Soon</h3>
            <p className="text-muted leading-relaxed text-[15px] mb-6">The full artist & speaker lineup for <span className="text-orange font-bold">Unleashed</span> is coming soon. Stay connected for announcements on worship leaders, speakers, and special guests.</p>
            <a href="#rsvp" className="inline-flex items-center justify-center min-h-[48px] rounded-full px-6 font-black bg-white/[.07] border border-white/[.16] backdrop-blur-[14px] hover:bg-white/[.12] text-sm transition-colors">Get Notified When Announced</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
