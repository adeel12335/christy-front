import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'

const slides = [
  { src: '/newImages/afdc8d53-fe1c-4103-a465-739bc0783277.png', label: 'Beach Stage Sunset' },
  { src: '/newImages/dae5d0ab-0ca8-40e1-b4ac-a8ab19fc83cf.png', label: 'Worship Atmosphere' },
  { src: '/newImages/5acb1806-3016-4346-86d3-903123c547b1.png', label: 'Ocean Stage View' },
  { src: '/newImages/23fca523-9ef0-47ad-be70-2f39ee878f51.png', label: 'Prayer & Community' },
  { src: '/newImages/233d9d3a-2e1e-4163-a08f-52a16e95164f.png', label: 'Surrender & Encounter' },
  { src: '/newImages/ad39f1b0-230d-4815-ba80-874440e9c41b.png', label: 'Event Flyer', poster: true },
  { src: '/newImages/c0a68368-0073-4404-8fa4-5781d70c79fe.png', label: 'Square Promo', square: true },
]

export default function Gallery() {
  const [prevEl, setPrevEl] = useState(null)
  const [nextEl, setNextEl] = useState(null)

  return (
    <section className="relative z-3 py-20 md:py-30 overflow-hidden" style={{ background: 'radial-gradient(circle at 85% 20%, rgba(255,98,20,.14), transparent 34%), #050303' }}>
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between gap-6 mb-14 max-md:block">
          <div>
            <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">Event Visuals</p>
            <h2 className="text-[clamp(42px,6vw,86px)] leading-[.95] tracking-tight max-w-[720px] max-sm:text-4xl">Atmosphere, worship, and encounter — captured.</h2>
          </div>
          <div className="flex gap-2.5 max-md:mt-4">
            <button ref={setPrevEl} className="w-[50px] h-[50px] rounded-full border border-white/15 bg-white/[.06] text-white text-xl cursor-pointer hover:bg-white/12 hover:border-orange/40 transition-all">←</button>
            <button ref={setNextEl} className="w-[50px] h-[50px] rounded-full border border-white/15 bg-white/[.06] text-white text-xl cursor-pointer hover:bg-white/12 hover:border-orange/40 transition-all">→</button>
          </div>
        </motion.div>

        <Swiper modules={[Navigation]} navigation={{ prevEl, nextEl }} slidesPerView={1.05} spaceBetween={18} speed={900} breakpoints={{ 720: { slidesPerView: 2.1 }, 1080: { slidesPerView: 2.75 } }} className="overflow-visible!">
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className={`rounded-[20px] sm:rounded-[30px] overflow-hidden border border-white/14 shadow-[0_30px_100px_rgba(0,0,0,.45)] relative bg-panel hover:scale-[1.02] transition-transform ${s.poster ? 'h-[420px] sm:h-[560px]' : 'h-[300px] sm:h-[440px]'}`}>
                <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
                <span className="absolute left-4.5 bottom-4.5 bg-black/50 backdrop-blur-lg border border-white/16 py-2.5 px-3.5 rounded-full text-[13px] font-black">{s.label}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
