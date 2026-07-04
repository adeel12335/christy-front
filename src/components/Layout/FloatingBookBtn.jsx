import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingBookBtn() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = document.getElementById('booking')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: .1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#booking"
          className="md:hidden fixed bottom-6 right-5 z-[90] flex items-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-orange to-orange-2 text-[#130805] font-black text-sm shadow-[0_16px_48px_rgba(255,91,21,.35)]"
          style={{ animation: 'pulse-glow 2s ease infinite' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Book Now
        </motion.a>
      )}
    </AnimatePresence>
  )
}
