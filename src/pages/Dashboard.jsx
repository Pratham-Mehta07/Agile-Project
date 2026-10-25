import { BriefcaseBusiness, CalendarCheck, CircleCheckBig, CircleX, Plus, Send } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import RecentApplications from '../components/dashboard/RecentApplications'
import StatusDistribution from '../components/dashboard/StatusDistribution'

export default function Dashboard({ applications, onAdd, onViewApplications }) {
  const count = (status) => applications.filter((application) => application.status === status).length
  const stats = [
    ['Total Applications', applications.length, BriefcaseBusiness, 'slate'],
    ['Applied', count('Applied'), Send, 'blue'],
    ['Interviews', count('Interview'), CalendarCheck, 'amber'],
    ['Offers', count('Offer'), CircleCheckBig, 'emerald'],
    ['Rejected', count('Rejected'), CircleX, 'rose'],
  ]

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-medium text-primary-600">Application overview</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Your job search, at a glance</h2><p className="mt-2 text-sm text-slate-500">Stay on top of every opportunity and next step.</p></div>
        <button onClick={onAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700"><Plus size={18} /> Add application</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{stats.map(([label, value, icon, accent]) => <StatCard key={label} label={label} value={value} icon={icon} accent={accent} />)}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]"><RecentApplications applications={applications} onViewAll={onViewApplications} /><StatusDistribution applications={applications} /></div>
    </div>
  )
}
