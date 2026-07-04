import { useState, useEffect } from 'react'
import { getSubmissions, updateSubmission, deleteSubmission } from '../../services/api'
import toast from 'react-hot-toast'

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState([])
  const [expanded, setExpanded] = useState(null)

  const load = () => getSubmissions().then(r => setSubmissions(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    try { await updateSubmission(id, { is_read: true }); load() } catch { toast.error('Failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this submission?')) return
    try { await deleteSubmission(id); toast.success('Deleted'); load() } catch { toast.error('Failed') }
  }

  const unread = submissions.filter(s => !s.is_read).length

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Submissions</h1>
        {unread > 0 && <span className="bg-orange/20 text-orange px-3 py-1 rounded-full text-sm font-bold">{unread} unread</span>}
      </div>

      <div className="space-y-3">
        {submissions.length === 0 && <p className="text-muted text-center py-12">No submissions yet.</p>}
        {submissions.map(s => (
          <div key={s.id} className={`bg-glass border rounded-2xl overflow-hidden transition-colors ${s.is_read ? 'border-white/8' : 'border-orange/25 bg-orange/[.02]'}`}>
            <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/[.03]" onClick={() => { setExpanded(expanded === s.id ? null : s.id); if (!s.is_read) markRead(s.id) }}>
              <div className="flex items-center gap-4">
                {!s.is_read && <span className="w-2.5 h-2.5 bg-orange rounded-full shadow-[0_0_10px_var(--color-orange)] shrink-0" />}
                <div>
                  <p className="font-bold">{s.name} <span className="text-muted font-normal text-sm ml-2">{s.email}</span></p>
                  <p className="text-muted text-sm mt-0.5">{s.interest || 'General'} · {new Date(s.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); handleDelete(s.id) }} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 cursor-pointer">Delete</button>
                <span className="text-muted text-lg">{expanded === s.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {expanded === s.id && (
              <div className="px-5 pb-5 border-t border-white/8 pt-4">
                {s.phone && <p className="text-sm mb-2"><span className="text-muted">Phone:</span> {s.phone}</p>}
                <p className="text-sm leading-relaxed">{s.message || 'No message provided.'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
