import { motion } from 'framer-motion'

const timeline = [
  { num: '01', title: 'Doors & atmosphere', desc: 'Arrival, connection, and pre-service worship environment.' },
  { num: '02', title: 'Worship experience', desc: 'A powerful worship room with sound, light, prayer, and expectation.' },
  { num: '03', title: 'Word & ministry', desc: 'Transformative Word, altar call, prayer, and encounter moments.' },
  { num: '04', title: 'Movement continues', desc: 'Updates, media, testimonies, partnerships, and future gatherings.' },
]

const facts = [
  { icon: '/assets/icons/calendar.svg', text: 'September 2026' },
  { icon: '/assets/icons/location.svg', text: 'The Bahamas' },
  { icon: '/assets/icons/flame.svg', text: 'Powered by Plugged in Faith' },
]

export default function EventDetail() {
  return (
    <section id="event" className="relative z-3 min-h-[860px] grid items-center overflow-hidden max-md:min-h-[auto] max-md:py-16 max-sm:py-12">
      <div className="absolute inset-0 -z-2">
        <img src="/hero-beach-night.png" alt="" className="w-full h-[120%] object-cover brightness-[.52] saturate-[1.12]" />
      </div>
      <div className="absolute inset-0 -z-1" style={{ background: 'linear-gradient(90deg, #050303 0%, rgba(5,3,3,.68) 45%, rgba(5,3,3,.9) 100%)' }} />

      <div className="w-[min(1180px,calc(100%-40px))] mx-auto grid md:grid-cols-[.95fr_1.05fr] gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-glass border border-white/12 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,.55)] rounded-[28px] p-8 md:p-12">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Upcoming Event</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight mb-6 max-sm:text-4xl">UNLEASHED</h2>
          <div className="grid gap-3 my-7">
            {facts.map(f => (
              <span key={f.text} className="flex items-center gap-3 py-3.5 border-b border-white/8 font-extrabold">
                <img src={f.icon} alt="" className="w-[22px]" style={{ filter: 'invert(72%) sepia(75%) saturate(808%) hue-rotate(333deg)' }} />{f.text}
              </span>
            ))}
          </div>
          <p className="text-muted leading-relaxed mb-5">Unleashed is not just an event. It is an outpouring. In light of recent tragedies and the weight many are carrying, this moment is intentional.</p>
          <a href="#booking" className="btn-shine inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] relative isolate overflow-hidden">GET TICKETS</a>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid gap-4">
          {timeline.map(t => (
            <div key={t.num} className="grid grid-cols-[70px_1fr] max-sm:grid-cols-[52px_1fr] gap-4.5 p-6 border border-white/10 bg-black/30 backdrop-blur-xl rounded-3xl hover:translate-x-2 hover:border-orange/30 transition-all">
              <b className="font-display text-orange text-[42px] leading-none">{t.num}</b>
              <div>
                <span className="text-xl font-black">{t.title}</span>
                <p className="text-muted mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
