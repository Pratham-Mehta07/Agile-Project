import { APPLICATION_STATUSES } from '../../utils/applicationValidation'

const colors = {
  Wishlist: 'bg-slate-400', Applied: 'bg-blue-500', Interview: 'bg-amber-500', Offer: 'bg-emerald-500', Rejected: 'bg-rose-500',
}

export default function StatusDistribution({ applications }) {
  const total = applications.length
  return (
    <section className="card p-5">
      <h2 className="font-semibold text-slate-900">Status distribution</h2>
      <p className="mt-0.5 text-sm text-slate-500">Progress across your pipeline</p>
      <div className="mt-6 space-y-5">
        {APPLICATION_STATUSES.map((status) => {
          const count = applications.filter((item) => item.status === status).length
          const percentage = total ? Math.round((count / total) * 100) : 0
          return (
            <div key={status}>
              <div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">{status}</span><span className="text-slate-500">{count} · {percentage}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all ${colors[status]}`} style={{ width: `${percentage}%` }} /></div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
