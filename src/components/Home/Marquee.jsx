const items = ['Dream Boldly', 'See Clearly', 'Speak Fearlessly', 'Encounter God']

export default function Marquee() {
  const track = [...items, ...items]
  return (
    <section className="relative z-4 py-4.5 border-y border-white/8 overflow-hidden" style={{ background: 'linear-gradient(90deg, rgba(255,98,20,.16), rgba(255,255,255,.03), rgba(255,98,20,.13))' }}>
      <div className="marquee-track flex gap-6 whitespace-nowrap">
        {track.map((t, i) => (
          <span key={i} className="contents">
            <span className="font-display text-[clamp(24px,4vw,60px)] tracking-[.05em] uppercase text-transparent" style={{ WebkitTextStroke: '1px rgba(255,224,192,.4)' }}>{t}</span>
            <i className="w-2.5 h-2.5 bg-orange rounded-full self-center shadow-[0_0_28px_var(--color-orange)]" />
          </span>
        ))}
      </div>
    </section>
  )
}
