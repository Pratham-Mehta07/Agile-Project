import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import StatusBadge from '../applications/StatusBadge'

const formatDate = (date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`))

export default function RecentApplications({ applications, onViewAll }) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Recent applications</h2>
          <p className="mt-0.5 text-sm text-slate-500">Your latest opportunities</p>
        </div>
        <button onClick={onViewAll} className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">View all <ArrowRight size={16} /></button>
      </div>
      {applications.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <div className="rounded-full bg-slate-100 p-3 text-slate-500"><BriefcaseBusiness size={22} /></div>
          <p className="mt-3 font-medium text-slate-700">No applications yet</p>
          <p className="mt-1 text-sm text-slate-500">Add your first opportunity to see it here.</p>
        </div>
      ) : (
        <div className="divide-y">
          {applications.slice(0, 5).map((application) => (
            <div key={application.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">{application.role}</p>
                <p className="mt-0.5 truncate text-sm text-slate-500">{application.company} · {formatDate(application.appliedDate)}</p>
              </div>
              <StatusBadge status={application.status} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
