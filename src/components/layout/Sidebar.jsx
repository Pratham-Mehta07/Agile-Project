import { BriefcaseBusiness, LayoutDashboard, X } from 'lucide-react'

const links = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'applications', label: 'Applications', icon: BriefcaseBusiness },
]

export default function Sidebar({ currentPage, onNavigate, mobileOpen, onClose }) {
  const content = (
    <>
      <div className="flex h-20 items-center justify-between px-6">
        <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-3" aria-label="Go to dashboard">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-600 text-white"><BriefcaseBusiness size={20} /></span>
          <span className="text-xl font-bold tracking-tight">JobTrack</span>
        </button>
        <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Close navigation"><X size={20} /></button>
      </div>
      <nav className="px-3 py-3" aria-label="Main navigation">
        {links.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { onNavigate(id); onClose() }} className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${currentPage === id ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Icon size={19} /> {label}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-5"><p className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">Track every opportunity,<br />from application to offer.</p></div>
    </>
  )

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-white lg:flex">{content}</aside>
      {mobileOpen && <div className="fixed inset-0 z-40 lg:hidden"><button className="absolute inset-0 bg-slate-900/30" onClick={onClose} aria-label="Close navigation overlay" /><aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">{content}</aside></div>}
    </>
  )
}
