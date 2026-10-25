import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { STORAGE_KEY } from '../utils/applicationStorage'

const application = { id: 'test-1', company: 'Acme', role: 'Developer', jobUrl: 'https://example.com/job', appliedDate: '2026-10-20', status: 'Applied', notes: 'Follow up next week' }

describe('application management interactions', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([application]))
  })

  it('prepopulates the edit form and immediately updates the application', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Applications' }))
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit Acme' })[0])
    expect(screen.getByLabelText(/Company name/)).toHaveValue('Acme')
    expect(screen.getByLabelText(/Job role/)).toHaveValue('Developer')
    expect(screen.getByLabelText('Job URL')).toHaveValue('https://example.com/job')
    expect(screen.getByLabelText('Notes')).toHaveValue('Follow up next week')
    fireEvent.change(screen.getByLabelText(/Company name/), { target: { value: 'Acme Corporation' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.getAllByText('Acme Corporation')).toHaveLength(2)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))[0].company).toBe('Acme Corporation')
  })

  it('preserves a cancelled deletion and removes a confirmed application', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Applications' }))
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete Acme' })[0])
    expect(screen.getByRole('dialog', { name: 'Delete application?' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog', { name: 'Delete application?' })).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toHaveLength(1)

    fireEvent.click(screen.getAllByRole('button', { name: 'Delete Acme' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'Delete application' }))
    expect(screen.getByText('No applications yet')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual([])
    fireEvent.click(screen.getByRole('button', { name: 'Dashboard' }))
    expect(screen.getByLabelText('Total Applications: 0')).toBeInTheDocument()
  })
})
