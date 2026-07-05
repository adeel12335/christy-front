import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#event', label: 'Event' },
  { href: '#artists', label: 'Artists' },
  { href: '#rsvp', label: 'Contact' },
]

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
const panel = { hidden: { x: '100%' }, visible: { x: 0, transition: { type: 'spring', damping: 28, stiffness: 260 } }, exit: { x: '100%', transition: { duration: .3 } } }
const linkVar = { hidden: { opacity: 0, x: 40 }, visible: i => ({ opacity: 1, x: 0, transition: { delay: .1 + i * .06, type: 'spring', damping: 20 } }) }

export default function MobileSidebar({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150]" variants={backdrop} initial="hidden" animate="visible" exit="exit" onClick={onClose} />
          <motion.nav className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-gradient-to-b from-[#0d0806] to-[#050303] border-l border-white/10 z-[151] flex flex-col p-8" variants={panel} initial="hidden" animate="visible" exit="exit">
            <motion.button onClick={onClose} className="self-end w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white text-xl grid place-items-center mb-10 cursor-pointer" whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: .2 }}>
              ✕
            </motion.button>

            <div className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => (
                <motion.a key={link.href} href={link.href} onClick={onClose} className="text-xl font-bold text-white/80 py-3 px-4 rounded-2xl hover:bg-white/8 hover:text-white transition-colors" custom={i} variants={linkVar} initial="hidden" animate="visible">
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div className="mt-auto pt-8 border-t border-white/8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>
              <a href="#rsvp" onClick={onClose} className="block w-full text-center py-4 rounded-full bg-gradient-to-r from-orange to-orange-2 text-[#130805] font-black text-sm shadow-lg mb-4">
                GET TICKETS
              </a>
              <div className="flex items-center gap-3 justify-center">
                <a href="mailto:info@pluggedinfaith.com" className="text-sm text-muted hover:text-amber transition-colors">info@pluggedinfaith.com</a>
              </div>
              <p className="text-center text-xs text-muted-2 mt-4">@pluggedinfaith</p>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
