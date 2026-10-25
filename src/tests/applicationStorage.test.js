import { beforeEach, describe, expect, it } from 'vitest'
import { addApplication, deleteApplication, getApplications, STORAGE_KEY, updateApplication, updateStatus } from '../utils/applicationStorage'

const validApplication = { company: 'Acme', role: 'Developer', jobUrl: 'https://example.com/job', appliedDate: '2026-10-25', status: 'Applied', notes: 'Remote' }

describe('application storage', () => {
  beforeEach(() => localStorage.clear())

  it('adds a valid application', () => {
    const saved = addApplication(validApplication)
    expect(saved.id).toEqual(expect.any(String))
    expect(getApplications()).toHaveLength(1)
  })

  it('retrieves saved applications', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: '1', ...validApplication }]))
    expect(getApplications()[0].company).toBe('Acme')
  })

  it('edits an application', () => {
    const saved = addApplication(validApplication)
    const edited = updateApplication(saved.id, { company: 'Globex' })
    expect(edited.company).toBe('Globex')
    expect(getApplications()[0].company).toBe('Globex')
  })

  it('deletes an application', () => {
    const saved = addApplication(validApplication)
    deleteApplication(saved.id)
    expect(getApplications()).toEqual([])
  })

  it('updates application status', () => {
    const saved = addApplication(validApplication)
    expect(updateStatus(saved.id, 'Interview').status).toBe('Interview')
  })

  it('rejects an invalid status', () => {
    const saved = addApplication(validApplication)
    expect(() => updateStatus(saved.id, 'Pending')).toThrow('Invalid application status.')
  })

  it('handles corrupted LocalStorage data', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json')
    expect(getApplications()).toEqual([])
  })
})
