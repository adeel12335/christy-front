import { useState, useEffect } from 'react'
import { getSettings, updateSettings } from '../../services/api'

export default function SettingsManager() {
  const [countdownDate, setCountdownDate] = useState('')
  const [countdownTime, setCountdownTime] = useState('')
  const [countdownLabel, setCountdownLabel] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getSettings().then(res => {
      const target = res.data?.countdown_target || ''
      if (target) {
        const [d, t] = target.split('T')
        setCountdownDate(d)
        setCountdownTime(t || '18:00')
      }
      setCountdownLabel(res.data?.countdown_label || '')
    }).catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      await updateSettings({
        countdown_target: `${countdownDate}T${countdownTime || '18:00:00'}`,
        countdown_label: countdownLabel
      })
      setMsg('Settings saved successfully!')
      setTimeout(() => setMsg(''), 3000)
    } catch {
      setMsg('Failed to save settings')
    }
    setSaving(false)
  }

  return (
    <div>
      <h2 className="text-3xl font-display tracking-tight mb-8">Settings</h2>

      <div className="max-w-[600px] bg-white/[.03] border border-white/10 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-black mb-1">Countdown Timer</h3>
        <p className="text-muted text-sm mb-6">Set the target date and time for the homepage countdown.</p>

        <div className="grid gap-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Label</label>
            <input type="text" value={countdownLabel} onChange={e => setCountdownLabel(e.target.value)} placeholder="e.g. Unleashed 2026" className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-3 text-white placeholder:text-muted/50 focus:border-orange/50 focus:outline-none transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Event Date</label>
              <input type="date" value={countdownDate} onChange={e => setCountdownDate(e.target.value)} className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-3 text-white focus:border-orange/50 focus:outline-none transition-colors [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Start Time</label>
              <input type="time" value={countdownTime} onChange={e => setCountdownTime(e.target.value)} className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-3 text-white focus:border-orange/50 focus:outline-none transition-colors [color-scheme:dark]" />
            </div>
          </div>

          {countdownDate && (
            <p className="text-sm text-muted">
              Countdown target: <span className="text-orange font-bold">{new Date(`${countdownDate}T${countdownTime || '18:00'}`).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/8">
          <button onClick={handleSave} disabled={saving || !countdownDate} className="px-6 py-3 rounded-xl font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-opacity">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {msg && <span className={`text-sm font-bold ${msg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{msg}</span>}
        </div>
      </div>
    </div>
  )
}
