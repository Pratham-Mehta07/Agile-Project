import { Plus } from 'lucide-react'
import ApplicationTable from '../components/applications/ApplicationTable'

export default function Applications({ applications, onAdd, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-medium text-primary-600">Opportunity tracker</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Applications</h2><p className="mt-2 text-sm text-slate-500">View and manage your current job applications.</p></div>
        <button onClick={onAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700"><Plus size={18} /> Add application</button>
      </div>
      <ApplicationTable applications={applications} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
    </div>
  )
}
