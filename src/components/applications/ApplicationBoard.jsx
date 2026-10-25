import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { APPLICATION_STATUSES } from '../../utils/applicationValidation'
import StatusBadge from './StatusBadge'

const formatDate = (date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`))

export default function ApplicationBoard({ applications, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {APPLICATION_STATUSES.map((status) => {
        const items = applications.filter((application) => application.status === status)
        return (
          <section key={status} aria-label={`${status} applications`} className="min-w-0 rounded-xl border border-slate-200 bg-slate-100/70 p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-800">{status}</h2>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500">{items.length}</span>
            </div>
            <div className="space-y-3">
              {items.map((application) => (
                <article key={application.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="break-words text-sm font-semibold text-slate-900">{application.company}</h3>
                      <p className="mt-1 flex items-center gap-1.5 break-words text-xs text-slate-600">
                        {application.role}
                        {application.jobUrl && <a href={application.jobUrl} target="_blank" rel="noreferrer" className="shrink-0 text-slate-400 hover:text-primary-600" aria-label={`Open ${application.role} job link`}><ExternalLink size={13} /></a>}
                      </p>
                    </div>
                    <StatusBadge status={application.status} />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Applied {formatDate(application.appliedDate)}</p>
                  <div className="mt-2 flex justify-end border-t pt-2">
                    <button onClick={() => onEdit(application)} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-primary-600" aria-label={`Edit ${application.company}`}><Pencil size={16} /></button>
                    <button onClick={() => onDelete(application)} className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label={`Delete ${application.company}`}><Trash2 size={16} /></button>
                  </div>
                </article>
              ))}
              {items.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 px-3 py-5 text-center text-xs text-slate-500">No applications</p>}
            </div>
          </section>
        )
      })}
    </div>
  )
}
