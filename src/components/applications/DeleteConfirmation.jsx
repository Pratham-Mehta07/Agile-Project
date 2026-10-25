import { Trash2, X } from 'lucide-react'

export default function DeleteConfirmation({ application, onCancel, onConfirm }) {
  if (!application) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-confirmation-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-rose-50 p-3 text-rose-600"><Trash2 size={20} /></div>
          <div className="min-w-0 flex-1">
            <h2 id="delete-confirmation-title" className="font-semibold text-slate-900">Delete application?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Delete the application for {application.role} at {application.company}? This action cannot be undone.</p>
          </div>
          <button type="button" onClick={onCancel} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close delete confirmation"><X size={18} /></button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={onConfirm} className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-700">Delete application</button>
        </div>
      </div>
    </div>
  )
}
