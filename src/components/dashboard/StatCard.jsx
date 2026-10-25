export default function StatCard({ label, value, icon: Icon, accent = 'blue' }) {
  const accents = {
    blue: 'bg-blue-50 text-blue-600',
    slate: 'bg-slate-100 text-slate-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
  }

  return (
    <div className="card flex items-center justify-between p-5" aria-label={`${label}: ${value}`}>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      </div>
      <div className={`rounded-xl p-3 ${accents[accent]}`}><Icon size={22} aria-hidden="true" /></div>
    </div>
  )
}
