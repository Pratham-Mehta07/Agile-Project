import { describe, expect, it } from 'vitest'
import { validateApplication } from '../utils/applicationValidation'

const validApplication = { company: 'Acme', role: 'Developer', jobUrl: '', appliedDate: '2026-10-25', status: 'Applied', notes: '' }

describe('application validation', () => {
  it('rejects an empty company name', () => {
    const result = validateApplication({ ...validApplication, company: '  ' })
    expect(result.isValid).toBe(false)
    expect(result.errors.company).toBe('Company name is required.')
  })

  it('rejects an empty job role', () => {
    const result = validateApplication({ ...validApplication, role: '' })
    expect(result.isValid).toBe(false)
    expect(result.errors.role).toBe('Job role is required.')
  })

  it('rejects an invalid status', () => {
    const result = validateApplication({ ...validApplication, status: 'Unknown' })
    expect(result.isValid).toBe(false)
    expect(result.errors.status).toBeTruthy()
  })
})
