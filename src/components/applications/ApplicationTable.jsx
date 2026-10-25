import { BriefcaseBusiness, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { APPLICATION_STATUSES } from '../../utils/applicationValidation'

const formatDate = (date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`))

function ApplicationActions({ application, onEdit, onDelete }) {
  return (
    <div className="flex gap-1">
      <button onClick={() => onEdit(application)} className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-primary-600" aria-label={`Edit ${application.company}`}><Pencil size={17} /></button>
      <button onClick={() => onDelete(application)} className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label={`Delete ${application.company}`}><Trash2 size={17} /></button>
    </div>
  )
}

export default function ApplicationTable({ applications, onEdit, onDelete, onStatusChange }) {
  if (applications.length === 0) return <div className="card flex flex-col items-center px-6 py-16 text-center"><div className="rounded-full bg-slate-100 p-4 text-slate-500"><BriefcaseBusiness size={26} /></div><h2 className="mt-4 font-semibold">No applications yet</h2><p className="mt-1 max-w-sm text-sm text-slate-500">Use “Add application” to start tracking your job search.</p></div>

  return (
    <>
      <div className="space-y-3 md:hidden">
        {applications.map((application) => (
          <article key={application.id} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900">{application.company}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <span className="truncate">{application.role}</span>
                  {application.jobUrl && <a href={application.jobUrl} target="_blank" rel="noreferrer" className="shrink-0 text-slate-400 hover:text-primary-600" aria-label={`Open ${application.role} job link`}><ExternalLink size={14} /></a>}
                </p>
              </div>
              <StatusBadge status={application.status} />
            </div>
            <p className="mt-3 text-xs text-slate-500">Applied {formatDate(application.appliedDate)}</p>
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                Status
                <select aria-label={`Update status for ${application.company}`} className="max-w-32 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700" value={application.status} onChange={(event) => onStatusChange(application.id, event.target.value)}>
                  {APPLICATION_STATUSES.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
              <ApplicationActions application={application} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </article>
        ))}
      </div>

      <div className="card hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3.5 font-semibold">Company</th><th className="px-5 py-3.5 font-semibold">Job role</th><th className="px-5 py-3.5 font-semibold">Application date</th><th className="px-5 py-3.5 font-semibold">Status</th><th className="px-5 py-3.5 text-right font-semibold">Actions</th></tr></thead>
            <tbody className="divide-y">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4 font-medium text-slate-900">{application.company}</td>
                  <td className="px-5 py-4 text-slate-700"><span className="flex items-center gap-2">{application.role}{application.jobUrl && <a href={application.jobUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600" aria-label={`Open ${application.role} job link`}><ExternalLink size={14} /></a>}</span></td>
                  <td className="px-5 py-4 text-slate-600">{formatDate(application.appliedDate)}</td>
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><StatusBadge status={application.status} /><select aria-label={`Update status for ${application.company}`} className="w-7 cursor-pointer bg-transparent text-transparent outline-none" value={application.status} onChange={(event) => onStatusChange(application.id, event.target.value)}>{APPLICATION_STATUSES.map((status) => <option key={status} className="text-slate-900">{status}</option>)}</select></div></td>
                  <td className="px-5 py-4"><div className="flex justify-end"><ApplicationActions application={application} onEdit={onEdit} onDelete={onDelete} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
