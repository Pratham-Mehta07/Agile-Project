export const APPLICATION_STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']

const isValidUrl = (value) => {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function validateApplication(data = {}) {
  const errors = {}

  if (!String(data.company ?? '').trim()) errors.company = 'Company name is required.'
  if (!String(data.role ?? '').trim()) errors.role = 'Job role is required.'
  if (!String(data.appliedDate ?? '').trim()) errors.appliedDate = 'Application date is required.'
  if (!APPLICATION_STATUSES.includes(data.status)) errors.status = 'Select a valid application status.'
  if (!isValidUrl(String(data.jobUrl ?? '').trim())) errors.jobUrl = 'Enter a valid http or https URL.'

  return { isValid: Object.keys(errors).length === 0, errors }
}

export function normalizeApplication(data = {}) {
  return {
    company: String(data.company ?? '').trim(),
    role: String(data.role ?? '').trim(),
    jobUrl: String(data.jobUrl ?? '').trim(),
    appliedDate: String(data.appliedDate ?? '').trim(),
    status: data.status ?? 'Applied',
    notes: String(data.notes ?? '').trim(),
  }
}
