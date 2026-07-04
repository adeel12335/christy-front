import { motion } from 'framer-motion'

const artists = [
  { name: 'Worship Leader', role: 'Lead Worship', img: '/newImages/afdc8d53-fe1c-4103-a465-739bc0783277.png' },
  { name: 'Guest Speaker', role: 'Keynote Message', img: '/newImages/dae5d0ab-0ca8-40e1-b4ac-a8ab19fc83cf.png' },
  { name: 'Ministry Team', role: 'Prayer & Ministry', img: '/newImages/23fca523-9ef0-47ad-be70-2f39ee878f51.png' },
  { name: 'Creative Director', role: 'Visual & Production', img: '/newImages/5acb1806-3016-4346-86d3-903123c547b1.png' },
]

export default function Artists() {
  return (
    <section id="artists" className="relative z-3 py-20 md:py-30">
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-[820px] mx-auto mb-14">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Who's Behind the Movement</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-sm:text-4xl">Carriers of the fire.</h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-2 max-[400px]:grid-cols-1">
          {artists.map((a, i) => (
            <motion.article key={a.name + i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-glass hover:border-orange/35 transition-all">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 pt-16" style={{ background: 'linear-gradient(transparent, rgba(5,3,3,.92))' }}>
                <h3 className="text-xl font-black">{a.name}</h3>
                <p className="text-orange text-sm font-bold mt-0.5">{a.role}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-muted mt-10 text-sm">Full artist & speaker lineup will be announced soon. Stay connected for updates.</p>
      </div>
    </section>
  )
}
