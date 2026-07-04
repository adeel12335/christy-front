import { useState, useEffect } from 'react'
import { getAllSettings, updateSettings, testSmtp } from '../../services/api'

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-3 text-white placeholder:text-muted/50 focus:border-orange/50 focus:outline-none transition-colors [color-scheme:dark]" />
    </div>
  )
}

export default function SettingsManager() {
  const [s, setS] = useState({
    countdown_target: '', countdown_label: '',
    smtp_host: '', smtp_port: '465', smtp_secure: 'true', smtp_user: '', smtp_pass: '', smtp_from: '',
    admin_emails: ''
  })
  const [countdownDate, setCountdownDate] = useState('')
  const [countdownTime, setCountdownTime] = useState('')
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [smtpMsg, setSmtpMsg] = useState({ text: '', type: '' })
  const [newEmail, setNewEmail] = useState('')

  useEffect(() => {
    getAllSettings().then(res => {
      const data = res.data || {}
      setS(prev => ({ ...prev, ...data }))
      if (data.countdown_target) {
        const [d, t] = data.countdown_target.split('T')
        setCountdownDate(d)
        setCountdownTime(t || '18:00')
      }
    }).catch(() => {})
  }, [])

  const update = (key, val) => setS(prev => ({ ...prev, [key]: val }))
  const flash = (setter, text, type) => { setter({ text, type }); setTimeout(() => setter({ text: '', type: '' }), 4000) }

  const emailList = (s.admin_emails || '').split(',').map(e => e.trim()).filter(Boolean)

  const addEmail = () => {
    if (!newEmail || !newEmail.includes('@')) return
    const updated = [...emailList, newEmail.trim()].join(',')
    update('admin_emails', updated)
    setNewEmail('')
  }

  const removeEmail = (idx) => {
    const updated = emailList.filter((_, i) => i !== idx).join(',')
    update('admin_emails', updated)
  }

  const saveCountdown = async () => {
    setSaving(true)
    try {
      await updateSettings({
        countdown_target: `${countdownDate}T${countdownTime || '18:00:00'}`,
        countdown_label: s.countdown_label
      })
      flash(setMsg, 'Countdown settings saved!', 'ok')
    } catch { flash(setMsg, 'Failed to save', 'err') }
    setSaving(false)
  }

  const saveSmtp = async () => {
    setSaving(true)
    try {
      await updateSettings({
        smtp_host: s.smtp_host, smtp_port: s.smtp_port, smtp_secure: s.smtp_secure,
        smtp_user: s.smtp_user, smtp_pass: s.smtp_pass, smtp_from: s.smtp_from,
        admin_emails: s.admin_emails
      })
      flash(setSmtpMsg, 'Email settings saved!', 'ok')
    } catch { flash(setSmtpMsg, 'Failed to save', 'err') }
    setSaving(false)
  }

  const handleTest = async () => {
    setTesting(true)
    try {
      const res = await testSmtp({
        smtp_host: s.smtp_host, smtp_port: s.smtp_port, smtp_secure: s.smtp_secure,
        smtp_user: s.smtp_user, smtp_pass: s.smtp_pass
      })
      flash(setSmtpMsg, res.data.message, 'ok')
    } catch (err) {
      flash(setSmtpMsg, err.response?.data?.message || 'Connection failed', 'err')
    }
    setTesting(false)
  }

  return (
    <div>
      <h2 className="text-3xl font-display tracking-tight mb-8">Settings</h2>
      <div className="grid gap-6 max-w-[700px]">

        {/* Countdown */}
        <div className="bg-white/[.03] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-black mb-1">Countdown Timer</h3>
          <p className="text-muted text-sm mb-6">Homepage countdown target date and time.</p>
          <div className="grid gap-4">
            <Field label="Label" value={s.countdown_label} onChange={v => update('countdown_label', v)} placeholder="e.g. Unleashed 2026" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Event Date" type="date" value={countdownDate} onChange={setCountdownDate} />
              <Field label="Start Time" type="time" value={countdownTime} onChange={setCountdownTime} />
            </div>
            {countdownDate && (
              <p className="text-sm text-muted">Target: <span className="text-orange font-bold">
                {new Date(`${countdownDate}T${countdownTime || '18:00'}`).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </span></p>
            )}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/8">
            <button onClick={saveCountdown} disabled={saving || !countdownDate} className="px-6 py-3 rounded-xl font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">
              {saving ? 'Saving...' : 'Save Countdown'}
            </button>
            {msg.text && <span className={`text-sm font-bold ${msg.type === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{msg.text}</span>}
          </div>
        </div>

        {/* SMTP */}
        <div className="bg-white/[.03] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-black mb-1">Email / SMTP Configuration</h3>
          <p className="text-muted text-sm mb-6">Configure outgoing email server for notifications and confirmations.</p>
          <div className="grid gap-4">
            <Field label="SMTP Host" value={s.smtp_host} onChange={v => update('smtp_host', v)} placeholder="smtp.hostinger.com" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="SMTP Port" value={s.smtp_port} onChange={v => update('smtp_port', v)} placeholder="465" />
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">SSL/TLS</label>
                <select value={s.smtp_secure} onChange={e => update('smtp_secure', e.target.value)}
                  className="w-full bg-black/40 border border-white/12 rounded-xl px-4 py-3 text-white focus:border-orange/50 focus:outline-none [color-scheme:dark]">
                  <option value="true">Enabled (port 465)</option>
                  <option value="false">Disabled (port 587)</option>
                </select>
              </div>
            </div>
            <Field label="SMTP Username" value={s.smtp_user} onChange={v => update('smtp_user', v)} placeholder="email@yourdomain.com" />
            <Field label="SMTP Password" type="password" value={s.smtp_pass} onChange={v => update('smtp_pass', v)} placeholder="••••••••" />
            <Field label="From Email (optional)" value={s.smtp_from || ''} onChange={v => update('smtp_from', v)} placeholder="noreply@yourdomain.com" />
          </div>
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/8 flex-wrap">
            <button onClick={handleTest} disabled={testing || !s.smtp_host || !s.smtp_user}
              className="px-5 py-3 rounded-xl font-black border border-white/15 bg-white/[.06] hover:bg-white/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              {testing ? 'Testing...' : 'Test Connection'}
            </button>
            <button onClick={saveSmtp} disabled={saving}
              className="px-6 py-3 rounded-xl font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">
              {saving ? 'Saving...' : 'Save Email Settings'}
            </button>
            {smtpMsg.text && <span className={`text-sm font-bold ${smtpMsg.type === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{smtpMsg.text}</span>}
          </div>
        </div>

        {/* Admin Recipients */}
        <div className="bg-white/[.03] border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-lg font-black mb-1">Notification Recipients</h3>
          <p className="text-muted text-sm mb-6">Admin emails that receive booking and submission notifications.</p>

          {emailList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {emailList.map((email, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-orange/10 border border-orange/25 text-orange rounded-full px-4 py-2 text-sm font-bold">
                  {email}
                  <button onClick={() => removeEmail(i)} className="text-orange/60 hover:text-red-400 cursor-pointer text-lg leading-none">&times;</button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Add email address..."
              onKeyDown={e => e.key === 'Enter' && addEmail()}
              className="flex-1 bg-black/40 border border-white/12 rounded-xl px-4 py-3 text-white placeholder:text-muted/50 focus:border-orange/50 focus:outline-none" />
            <button onClick={addEmail} disabled={!newEmail || !newEmail.includes('@')}
              className="px-5 py-3 rounded-xl font-black bg-white/[.08] border border-white/15 hover:bg-white/12 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              Add
            </button>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/8">
            <button onClick={saveSmtp} disabled={saving}
              className="px-6 py-3 rounded-xl font-black bg-gradient-to-br from-orange to-orange-2 text-[#130805] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed">
              {saving ? 'Saving...' : 'Save Recipients'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
