import { motion } from 'framer-motion'

const pillars = [
  { num: '01', title: 'Dream Boldly', desc: 'Empowering vision that transcends boundaries.' },
  { num: '02', title: 'See Clearly', desc: 'Prophetic clarity in a generation of noise.' },
  { num: '03', title: 'Speak Fearlessly', desc: 'Voices activated for the Kingdom.' },
]

export default function About() {
  return (
    <section id="about" className="relative z-3 py-20 md:py-30" style={{ background: 'radial-gradient(circle at 15% 0%, rgba(255,101,20,.16), transparent 32%), linear-gradient(180deg, #050303, #0b0605)' }}>
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto grid md:grid-cols-[1fr_.9fr] gap-12 md:gap-[70px] items-start">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
          <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">About Plugged in Faith</p>
          <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight m-0 mb-6 max-sm:text-4xl">Not created — called.</h2>
          <p className="text-muted text-[17px] leading-relaxed mb-4">What began in 2020 as a step of faith has now evolved into a divine assignment. After a season of stillness, God began stirring something deeper, something that could no longer remain dormant.</p>
          <p className="text-muted text-[17px] leading-relaxed mb-8">Through prayer, surrender, and obedience, the vision became clear: to build spaces where people don't just hear about God, but encounter Him.</p>

          <div className="grid grid-cols-3 gap-4 mb-4 max-sm:grid-cols-1">
            {pillars.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 * i }} className="p-5 border border-white/10 bg-white/[.04] rounded-2xl hover:-translate-y-1.5 hover:border-orange/30 transition-all">
                <div className="font-display text-3xl text-orange mb-2.5">{p.num}</div>
                <h4 className="text-base font-bold mb-1.5">{p.title}</h4>
                <p className="text-[13px] text-muted leading-relaxed m-0">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <a href="#event" className="inline-flex gap-2.5 mt-3.5 text-amber font-black hover:gap-4 transition-all">Explore the gathering <span>→</span></a>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="relative">
          <img src="/prayer-circle.png" alt="Prayer circle on the beach" className="w-full rounded-[28px] shadow-[0_30px_100px_rgba(0,0,0,.55)] border border-white/10 aspect-[16/10] object-cover" />
          <div className="relative -mt-20 mx-3 sm:mx-8 rounded-[28px] bg-gradient-to-b from-white/8 to-white/[.025] border border-white/12 p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,.55)] overflow-hidden">
            <div className="absolute -inset-[20%] blur-[20px]" style={{ background: 'radial-gradient(circle at 50% 34%, rgba(255,101,20,.42), transparent 32%), radial-gradient(circle at 70% 70%, rgba(255,177,90,.16), transparent 28%)' }} />
            <h3 className="relative font-serif text-[clamp(22px,3vw,36px)] leading-tight mb-3.5">"And afterward, I will pour out my Spirit on all people…"</h3>
            <p className="relative text-amber font-black">Joel 2:28</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
