import { useEffect, useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import ApplicationForm from './components/applications/ApplicationForm'
import DeleteConfirmation from './components/applications/DeleteConfirmation'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import { addApplication, deleteApplication, getApplications, updateApplication, updateStatus } from './utils/applicationStorage'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [applications, setApplications] = useState(() => getApplications())
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(() => setNotice(''), 3000)
    return () => clearTimeout(timer)
  }, [notice])

  const refresh = () => setApplications(getApplications())
  const openAdd = () => { setEditing(null); setFormOpen(true) }
  const openEdit = (application) => { setEditing(application); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setEditing(null) }
  const save = (data) => {
    if (editing) updateApplication(editing.id, data)
    else addApplication(data)
    refresh(); closeForm(); setNotice(editing ? 'Application updated.' : 'Application added.')
  }
  const remove = () => {
    if (!deleting) return
    try { deleteApplication(deleting.id); refresh(); setNotice('Application deleted.') } catch (error) { setNotice(error.message) }
    setDeleting(null)
  }
  const changeStatus = (id, status) => {
    try { updateStatus(id, status); refresh(); setNotice('Status updated.') } catch (error) { setNotice(error.message) }
  }

  return (
    <div className="min-h-screen">
      <Sidebar currentPage={page} onNavigate={setPage} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-64">
        <Header title={page === 'dashboard' ? 'Dashboard' : 'Applications'} onMenuOpen={() => setMobileOpen(true)} />
        <main>{page === 'dashboard' ? <Dashboard applications={applications} onAdd={openAdd} onViewApplications={() => setPage('applications')} /> : <Applications applications={applications} onAdd={openAdd} onEdit={openEdit} onDelete={setDeleting} onStatusChange={changeStatus} />}</main>
      </div>
      {formOpen && <ApplicationForm application={editing} onSave={save} onClose={closeForm} />}
      <DeleteConfirmation application={deleting} onCancel={() => setDeleting(null)} onConfirm={remove} />
      {notice && <div className="fixed bottom-5 right-5 z-[60] rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg" role="status">{notice}</div>}
    </div>
  )
}
