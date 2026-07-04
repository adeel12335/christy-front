import { motion } from 'framer-motion'

export default function MovementStatement() {
  return (
    <section className="relative z-3 min-h-[500px] md:min-h-[600px] grid items-center overflow-hidden">
      <div className="absolute inset-0 -z-2">
        <img src="/newImages/233d9d3a-2e1e-4163-a08f-52a16e95164f.png" alt="People kneeling in prayer" className="w-full h-full object-cover brightness-[.35] saturate-[1.2]" />
      </div>
      <div className="absolute inset-0 -z-1" style={{ background: 'linear-gradient(180deg, #050303 0%, rgba(5,3,3,.3) 30%, rgba(5,3,3,.3) 70%, #050303 100%)' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-[860px] w-[min(860px,calc(100%-40px))] mx-auto">
        <p className="uppercase tracking-[.28em] text-amber text-xs font-extrabold mb-4">The Call</p>
        <h2 className="text-[clamp(26px,5vw,56px)] leading-[1.15] tracking-tight mb-6 max-sm:text-[26px]">
          This is more than content.<br />This is more than events.<br />This is a call to awakening.
        </h2>
        <p className="text-muted text-[19px] leading-relaxed max-w-[640px] mx-auto max-sm:text-base">This movement is for those who know there is more. More purpose. More depth. More of God. We are here to awaken it.</p>
      </motion.div>
    </section>
  )
}
