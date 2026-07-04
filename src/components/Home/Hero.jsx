import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import CountdownTimer from '../UI/CountdownTimer'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const slides = [
  { src: '/assets/img/hero-cross.jpg', alt: 'Worship crowd before a glowing cross' },
  { src: '/newImages/afdc8d53-fe1c-4103-a465-739bc0783277.png', alt: 'Beach stage worship at sunset' },
  { src: '/newImages/dae5d0ab-0ca8-40e1-b4ac-a8ab19fc83cf.png', alt: 'Worship crowd with hands raised' },
  { src: '/newImages/5acb1806-3016-4346-86d3-903123c547b1.png', alt: 'Stage from ocean view' },
]

const meta = [
  { icon: '/assets/icons/calendar.svg', text: 'September 2026' },
  { icon: '/assets/icons/location.svg', text: 'The Bahamas' },
  { icon: '/assets/icons/flame.svg', text: 'Joel 2:28' },
]

export default function Hero() {
  return (
    <section id="home" className="min-h-svh relative flex flex-col justify-center overflow-hidden">
      <Swiper modules={[EffectFade, Autoplay, Pagination]} effect="fade" loop speed={1400} autoplay={{ delay: 4800, disableOnInteraction: false }} pagination={{ el: '.hero-pagination', clickable: true }} className="!absolute inset-0 w-full h-full">
        {slides.map((s, i) => (
          <SwiperSlide key={i} className="!absolute inset-0">
            <img src={s.src} alt={s.alt} className="hero-slide-img w-full h-full object-cover scale-[1.08] saturate-[1.08] contrast-[1.03]" />
          </SwiperSlide>
        ))}
        <div className="hero-pagination max-md:!hidden" />
      </Swiper>

      <div className="absolute inset-0 z-2" style={{ background: 'radial-gradient(circle at 72% 42%, rgba(255,98,19,.16), transparent 30%), linear-gradient(90deg, rgba(3,2,2,.97) 0%, rgba(5,3,3,.62) 42%, rgba(5,3,3,.35) 66%, rgba(5,3,3,.9) 100%), linear-gradient(180deg, rgba(0,0,0,.32), rgba(0,0,0,.55) 68%, #050303 98%)' }} />

      <div className="relative z-3 pt-[90px] pb-6 w-[min(1180px,calc(100%-40px))] mx-auto max-sm:pt-[80px]">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }} className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4 max-sm:text-[10px] max-sm:tracking-[.2em]">
          Plugged in Faith presents
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6, duration: .8 }} className="font-display text-[clamp(72px,14vw,228px)] leading-[.84] tracking-[.015em] m-0 max-sm:text-[clamp(52px,18vw,100px)]" style={{ textShadow: '0 0 50px rgba(255,96,22,.42)', background: 'linear-gradient(180deg, #fff2d2 0%, #ff9b35 50%, #6f210b 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          UNLEASHED
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }} className="font-serif text-[clamp(18px,2.5vw,34px)] text-amber italic mt-4 max-sm:text-lg">
          A Movement. A Mandate. A Revival.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="max-w-[720px] text-[clamp(15px,1.8vw,22px)] leading-relaxed text-[#f5dfcf] mt-3.5 max-sm:text-[15px]">
          Empowering a generation to dream, see, and speak through the power of the Holy Spirit.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="flex gap-3 flex-wrap mt-6 max-sm:flex-col">
          <a href="#booking" className="btn-shine inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] shadow-[0_22px_64px_rgba(255,91,21,.27)] relative isolate overflow-hidden max-sm:w-full max-sm:min-h-[48px] max-sm:text-sm">Join the Movement</a>
          <a href="#event" className="inline-flex items-center justify-center min-h-[52px] rounded-full px-6 font-black bg-white/[.07] border border-white/[.16] backdrop-blur-[14px] hover:bg-white/[.12] max-sm:w-full max-sm:min-h-[48px] max-sm:text-sm">Get Event Updates</a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <CountdownTimer />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} className="grid grid-cols-3 gap-2.5 mt-5 max-sm:grid-cols-3 max-sm:gap-2 max-md:max-w-[520px]">
          {meta.map(m => (
            <div key={m.text} className="flex items-center justify-center gap-2.5 py-3.5 px-4 border border-white/14 bg-[rgba(7,4,4,.5)] backdrop-blur-lg rounded-2xl text-[#fff0df] font-extrabold text-sm max-sm:py-3 max-sm:text-[13px]">
              <img src={m.icon} alt="" className="w-5 max-sm:w-4" style={{ filter: 'invert(72%) sepia(75%) saturate(808%) hue-rotate(333deg)' }} />
              {m.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
