import { useMemo, useState } from 'react'
import { LayoutGrid, List, Plus, Search, X } from 'lucide-react'
import ApplicationBoard from '../components/applications/ApplicationBoard'
import ApplicationTable from '../components/applications/ApplicationTable'
import { APPLICATION_STATUSES } from '../utils/applicationValidation'

export default function Applications({ applications, onAdd, onEdit, onDelete, onStatusChange }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState('table')

  const visibleApplications = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return applications
      .filter((application) => (
        (status === 'All' || application.status === status)
        && (!query || `${application.company ?? ''} ${application.role ?? ''}`.toLocaleLowerCase().includes(query))
      ))
      .sort((first, second) => {
        if (sort === 'company') return String(first.company ?? '').localeCompare(String(second.company ?? ''), undefined, { sensitivity: 'base' })
        const dateOrder = String(first.appliedDate ?? '').localeCompare(String(second.appliedDate ?? ''))
        return sort === 'oldest' ? dateOrder : -dateOrder
      })
  }, [applications, search, sort, status])

  const hasActiveFilters = search.trim().length > 0 || status !== 'All'
  const noMatches = applications.length > 0 && visibleApplications.length === 0
  const clearFilters = () => { setSearch(''); setStatus('All') }

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-medium text-primary-600">Opportunity tracker</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Applications</h2><p className="mt-2 text-sm text-slate-500">View and manage your current job applications.</p></div>
        <button onClick={onAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700"><Plus size={18} /> Add application</button>
      </div>

      <section className="card mb-5 p-4" aria-label="Application search and filters">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_12rem_13rem_auto] lg:items-end">
          <div>
            <label htmlFor="application-search" className="form-label">Search applications</label>
            <div className="relative">
              <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input id="application-search" type="search" className="form-control pl-9" placeholder="Company or job role" value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="application-status-filter" className="form-label">Status filter</label>
            <select id="application-status-filter" className="form-control" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>All</option>
              {APPLICATION_STATUSES.map((applicationStatus) => <option key={applicationStatus}>{applicationStatus}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="application-sort" className="form-label">Sort by</label>
            <select id="application-sort" className="form-control" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="newest">Newest application date</option>
              <option value="oldest">Oldest application date</option>
              <option value="company">Company name A-Z</option>
            </select>
          </div>
          {hasActiveFilters && !noMatches && <button type="button" onClick={clearFilters} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100"><X size={16} /> Clear filters</button>}
        </div>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500" aria-live="polite">{visibleApplications.length} {visibleApplications.length === 1 ? 'application' : 'applications'}</p>
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1" aria-label="Application view">
          <button type="button" onClick={() => setView('table')} aria-pressed={view === 'table'} className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${view === 'table' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}><List size={16} /> List</button>
          <button type="button" onClick={() => setView('board')} aria-pressed={view === 'board'} className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${view === 'board' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}><LayoutGrid size={16} /> Board</button>
        </div>
      </div>

      {noMatches ? (
        <div className="card flex flex-col items-center px-6 py-14 text-center">
          <div className="rounded-full bg-slate-100 p-4 text-slate-500"><Search size={24} /></div>
          <h2 className="mt-4 font-semibold">No matching applications</h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500">Try a different company or role, or clear your filters to see all applications.</p>
          <button type="button" onClick={clearFilters} className="mt-4 rounded-lg px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50">Clear filters</button>
        </div>
      ) : applications.length === 0 ? (
        <ApplicationTable applications={visibleApplications} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
      ) : view === 'board' ? (
        <ApplicationBoard applications={visibleApplications} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <ApplicationTable applications={visibleApplications} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
      )}
    </div>
  )
}
