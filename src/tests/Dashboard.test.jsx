import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Dashboard from '../pages/Dashboard'

const applications = [
  { id: '1', company: 'Acme', role: 'Developer', appliedDate: '2026-10-20', status: 'Applied' },
  { id: '2', company: 'Globex', role: 'Designer', appliedDate: '2026-10-21', status: 'Interview' },
  { id: '3', company: 'Initech', role: 'Engineer', appliedDate: '2026-10-22', status: 'Offer' },
]

describe('Dashboard', () => {
  it('renders calculated dashboard statistics', () => {
    render(<Dashboard applications={applications} onAdd={vi.fn()} onViewApplications={vi.fn()} />)
    expect(screen.getByLabelText('Total Applications: 3')).toBeInTheDocument()
    expect(screen.getByLabelText('Applied: 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Interviews: 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Offers: 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Rejected: 0')).toBeInTheDocument()
  })
})
