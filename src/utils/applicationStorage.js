import { APPLICATION_STATUSES, normalizeApplication, validateApplication } from './applicationValidation'

export const STORAGE_KEY = 'jobtrack-applications'

const storage = () => {
  if (typeof window === 'undefined' || !window.localStorage) return null
  return window.localStorage
}

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function persist(applications) {
  try {
    const target = storage()
    if (!target) throw new Error('LocalStorage is unavailable.')
    target.setItem(STORAGE_KEY, JSON.stringify(applications))
  } catch {
    throw new Error('Unable to save applications in this browser.')
  }
}

export function getApplications() {
  try {
    const raw = storage()?.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item === 'object' && typeof item.id === 'string')
  } catch {
    return []
  }
}

export function addApplication(data) {
  const application = normalizeApplication(data)
  const validation = validateApplication(application)
  if (!validation.isValid) throw new Error(Object.values(validation.errors)[0])

  const created = { id: createId(), ...application }
  persist([...getApplications(), created])
  return created
}

export function updateApplication(id, changes) {
  if (!id || !changes || typeof changes !== 'object') throw new Error('Invalid application update.')
  const applications = getApplications()
  const index = applications.findIndex((application) => application.id === id)
  if (index === -1) throw new Error('Application not found.')

  const merged = normalizeApplication({ ...applications[index], ...changes })
  const validation = validateApplication(merged)
  if (!validation.isValid) throw new Error(Object.values(validation.errors)[0])

  const updated = { ...merged, id }
  const next = [...applications]
  next[index] = updated
  persist(next)
  return updated
}

export function deleteApplication(id) {
  const applications = getApplications()
  if (!applications.some((application) => application.id === id)) throw new Error('Application not found.')
  persist(applications.filter((application) => application.id !== id))
  return true
}

export function updateStatus(id, status) {
  if (!APPLICATION_STATUSES.includes(status)) throw new Error('Invalid application status.')
  return updateApplication(id, { status })
}
