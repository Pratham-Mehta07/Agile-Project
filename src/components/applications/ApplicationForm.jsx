import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { APPLICATION_STATUSES, normalizeApplication, validateApplication } from '../../utils/applicationValidation'

const today = () => new Date().toISOString().slice(0, 10)
const emptyForm = () => ({ company: '', role: '', jobUrl: '', appliedDate: today(), status: 'Applied', notes: '' })

export default function ApplicationForm({ application, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [saveError, setSaveError] = useState('')

  useEffect(() => setForm(application ? normalizeApplication(application) : emptyForm()), [application])

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    const clean = normalizeApplication(form)
    const result = validateApplication(clean)
    if (!result.isValid) return setErrors(result.errors)
    try { onSave(clean) } catch (error) { setSaveError(error.message) }
  }

  const field = (name, label, required = false, type = 'text') => (
    <div>
      <label className="form-label" htmlFor={name}>{label}{required && <span className="text-rose-500"> *</span>}</label>
      <input className={`form-control ${errors[name] ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100' : ''}`} id={name} name={name} type={type} value={form[name]} onChange={update} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />
      {errors[name] && <p id={`${name}-error`} className="mt-1.5 text-xs text-rose-600">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="application-form-title">
      <form onSubmit={submit} className="max-h-[95vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl">
        <div className="sticky top-0 flex items-start justify-between border-b bg-white px-5 py-4 sm:px-6">
          <div><h2 id="application-form-title" className="text-lg font-semibold">{application ? 'Edit application' : 'Add application'}</h2><p className="mt-1 text-sm text-slate-500">Keep the details of this opportunity in one place.</p></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close form"><X size={20} /></button>
        </div>
        <div className="grid gap-5 px-5 py-6 sm:grid-cols-2 sm:px-6">
          {field('company', 'Company name', true)}
          {field('role', 'Job role', true)}
          {field('jobUrl', 'Job URL', false, 'url')}
          {field('appliedDate', 'Application date', true, 'date')}
          <div>
            <label className="form-label" htmlFor="status">Application status</label>
            <select className="form-control" id="status" name="status" value={form.status} onChange={update}>{APPLICATION_STATUSES.map((status) => <option key={status}>{status}</option>)}</select>
            {errors.status && <p className="mt-1.5 text-xs text-rose-600">{errors.status}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea className="form-control min-h-24 resize-y" id="notes" name="notes" value={form.notes} onChange={update} placeholder="Interview details, contacts, or follow-up notes" />
          </div>
          {saveError && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 sm:col-span-2">{saveError}</p>}
        </div>
        <div className="flex justify-end gap-3 border-t bg-slate-50 px-5 py-4 sm:px-6">
          <button type="button" onClick={onClose} className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700">{application ? 'Save changes' : 'Add application'}</button>
        </div>
      </form>
    </div>
  )
}
