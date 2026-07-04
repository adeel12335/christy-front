import { motion } from 'framer-motion'

const pillars = [
  { icon: '/assets/icons/mic.svg', title: 'Powerful Worship', desc: 'Immersive, Spirit-led worship designed to turn attention toward God\'s presence.' },
  { icon: '/assets/icons/flame.svg', title: 'Transformative Word', desc: 'A message that speaks into purpose, healing, obedience, and revival.' },
  { icon: '/assets/icons/pray.svg', title: 'Prayer & Ministry', desc: 'Prayer, altar call, and ministry moments for people carrying real weight.' },
  { icon: '/assets/icons/users.svg', title: 'Shared Encounter', desc: 'An atmosphere of surrender, healing, expectation, and divine appointment.' },
]

export default function Pillars() {
  return (
    <section className="relative z-3 py-20 md:py-30">
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-[820px] mx-auto mb-14">
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">What to Expect</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-sm:text-4xl">A designed atmosphere for surrender and encounter.</h2>
        </motion.div>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {pillars.map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }} className="min-h-[300px] p-7.5 border border-white/10 bg-gradient-to-b from-white/[.07] to-white/[.025] rounded-[26px] relative overflow-hidden group hover:-translate-y-2.5 hover:border-orange/35 transition-all">
              <div className="absolute inset-x-[-20%] bottom-[-40%] h-40 bg-[radial-gradient(circle,rgba(255,98,20,.2),transparent_70%)] transition-all group-hover:h-60" />
              <img src={p.icon} alt="" className="w-[42px] h-[42px] mb-9 relative" style={{ filter: 'invert(70%) sepia(92%) saturate(693%) hue-rotate(332deg)' }} />
              <h3 className="text-2xl font-bold mb-3.5 relative">{p.title}</h3>
              <p className="text-muted leading-relaxed relative">{p.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
