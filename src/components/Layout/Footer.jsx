export default function Footer() {
  return (
    <footer id="contact" className="relative z-3 pt-[70px] pb-7 bg-[#030202] border-t border-white/[.09]">
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto grid grid-cols-[1.6fr_.8fr_.7fr_.7fr] gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <a href="#home" className="flex items-center gap-3 mb-4">
            <img src="/assets/img/logo-mark.png" alt="" className="w-[54px]" />
            <span className="leading-none flex flex-col">
              <b className="text-lg tracking-tight">Unleashed</b>
              <small className="uppercase tracking-[.36em] text-[9px] text-muted">Entertainment</small>
            </span>
          </a>
          <p className="text-muted leading-relaxed max-w-[520px]">Plugged in Faith is a faith-driven movement and creative platform creating spaces where God's presence is encountered, voices are activated, and lives are transformed.</p>
        </div>
        <div>
          <h4 className="mb-3.5 text-white font-bold">Contact</h4>
          <a href="mailto:info@pluggedinfaith.com" className="block text-muted my-2.5 hover:text-amber transition-colors">info@pluggedinfaith.com</a>
          <a href="mailto:bookings@pluggedinfaith.com" className="block text-muted my-2.5 hover:text-amber transition-colors">bookings@pluggedinfaith.com</a>
        </div>
        <div>
          <h4 className="mb-3.5 text-white font-bold">Follow</h4>
          <a href="#" className="block text-muted my-2.5 hover:text-amber transition-colors">@pluggedinfaith</a>
          <a href="#rsvp" className="block text-muted my-2.5 hover:text-amber transition-colors">Get Event Updates</a>
        </div>
        <div>
          <h4 className="mb-3.5 text-white font-bold">Event</h4>
          <a href="#event" className="block text-muted my-2.5 hover:text-amber transition-colors">UNLEASHED</a>
          <a href="#booking" className="block text-muted my-2.5 hover:text-amber transition-colors">Book Your Spot</a>
          <a href="#artists" className="block text-muted my-2.5 hover:text-amber transition-colors">Artists &amp; Speakers</a>
        </div>
      </div>
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto mt-10 pt-6 border-t border-white/8 text-muted-2 text-[13px]">
        &copy; 2026 Unleashed Entertainment / Plugged in Faith. A Movement. A Mandate. A Revival.
      </div>
    </footer>
  )
}
