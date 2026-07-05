import { useState, useEffect } from 'react'
import MobileSidebar from './MobileSidebar'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#event', label: 'Event' },
  { href: '#artists', label: 'Artists' },
  { href: '#rsvp', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={`fixed top-5 left-1/2 -translate-x-1/2 w-[min(1220px,calc(100%-32px))] flex items-center justify-between gap-5 px-3.5 py-3 border border-white/12 backdrop-blur-[22px] rounded-full z-[100] transition-all duration-300 ${scrolled ? 'top-2.5 bg-[rgba(5,3,3,.86)] shadow-[0_16px_60px_rgba(0,0,0,.45)]' : 'bg-[rgba(5,3,3,.46)]'} max-md:w-[calc(100%-18px)] max-sm:top-3 max-sm:px-2.5 max-sm:py-2`}>
        <a href="#home" className="flex items-center gap-2">
          <img src="/plugged-in-faith-logo.png" alt="Plugged in Faith" className="h-[42px] max-sm:h-[34px] object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-[13px] text-white/70 py-2.5 px-3.5 rounded-full transition-colors hover:bg-white/8 hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a href="#rsvp" className="hidden md:inline-flex py-3 px-5 rounded-full bg-gradient-to-br from-orange to-orange-2 text-[13px] font-extrabold shadow-[0_12px_38px_rgba(255,91,21,.25)] hover:scale-[1.04] transition-transform">
          GET TICKETS
        </a>

        <button onClick={() => setSidebarOpen(true)} className="md:hidden w-[42px] h-[42px] bg-transparent border-0 text-white cursor-pointer flex flex-col items-center justify-center gap-1.5" aria-label="Open menu">
          <span className="block w-6 h-0.5 bg-white transition-transform" />
          <span className="block w-6 h-0.5 bg-white transition-transform" />
        </button>
      </header>

      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
