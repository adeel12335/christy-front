import { useRef, useEffect, useState } from 'react'
import useCountdown from '../../hooks/useCountdown'
import { getSettings } from '../../services/api'

const FALLBACK_DATE = '2026-09-18T18:00:00'

function Digit({ value, label }) {
  const ref = useRef(null)
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current !== value && ref.current) {
      ref.current.classList.remove('cd-flip')
      void ref.current.offsetWidth
      ref.current.classList.add('cd-flip')
      prev.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center px-2.5 py-2.5 sm:px-5 sm:py-4 bg-black/45 border border-white/12 rounded-xl sm:rounded-2xl backdrop-blur-2xl min-w-[56px] sm:min-w-[78px]">
      <span ref={ref} className="font-display text-2xl sm:text-5xl leading-none bg-gradient-to-b from-[#fff2d2] to-orange bg-clip-text text-transparent">
        {value}
      </span>
      <span className="text-[9px] sm:text-[11px] uppercase tracking-[.15em] sm:tracking-[.2em] text-muted mt-1">{label}</span>
    </div>
  )
}

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState(FALLBACK_DATE)

  useEffect(() => {
    getSettings()
      .then(res => {
        if (res.data?.countdown_target) setTargetDate(res.data.countdown_target)
      })
      .catch(() => {})
  }, [])

  const { days, hours, mins, secs } = useCountdown(targetDate)
  const sep = <span className="font-display text-xl sm:text-4xl text-orange" style={{ animation: 'sepPulse 1.4s infinite' }}>:</span>

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mt-5 sm:mt-6">
      <Digit value={String(days).padStart(3, '0')} label="Days" />
      {sep}
      <Digit value={String(hours).padStart(2, '0')} label="Hours" />
      {sep}
      <Digit value={String(mins).padStart(2, '0')} label="Minutes" />
      {sep}
      <Digit value={String(secs).padStart(2, '0')} label="Seconds" />
    </div>
  )
}
