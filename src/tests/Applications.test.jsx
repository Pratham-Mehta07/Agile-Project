import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Applications from '../pages/Applications'

const applications = [
  { id: '1', company: 'Globex', role: 'Designer', appliedDate: '2026-10-21', status: 'Interview' },
  { id: '2', company: 'Acme', role: 'Frontend Developer', appliedDate: '2026-10-20', status: 'Applied' },
  { id: '3', company: 'Initech', role: 'Engineer', appliedDate: '2026-10-22', status: 'Offer' },
]

const renderApplications = (items = applications) => render(
  <Applications applications={items} onAdd={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />,
)

describe('Applications page', () => {
  it('searches company and role names without case sensitivity', () => {
    renderApplications()
    fireEvent.change(screen.getByLabelText('Search applications'), { target: { value: 'fRoNtEnD' } })
    expect(screen.getAllByText('Acme')).toHaveLength(2)
    expect(screen.queryByText('Globex')).not.toBeInTheDocument()
    expect(screen.getByText('1 application')).toBeInTheDocument()
  })

  it('combines status filtering with search and clears both filters', () => {
    renderApplications()
    fireEvent.change(screen.getByLabelText('Status filter'), { target: { value: 'Interview' } })
    fireEvent.change(screen.getByLabelText('Search applications'), { target: { value: 'globex' } })
    expect(screen.getAllByText('Globex')).toHaveLength(2)
    expect(screen.queryByText('Acme')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getByText('3 applications')).toBeInTheDocument()
    expect(screen.getByLabelText('Status filter')).toHaveValue('All')
    expect(screen.getByLabelText('Search applications')).toHaveValue('')
  })

  it('sorts without mutating the input order', () => {
    renderApplications()
    fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'company' } })
    const companyCells = within(screen.getByRole('table')).getAllByRole('cell').filter((cell) => ['Acme', 'Globex', 'Initech'].includes(cell.textContent))
    expect(companyCells.map((cell) => cell.textContent)).toEqual(['Acme', 'Globex', 'Initech'])
    expect(applications.map((application) => application.company)).toEqual(['Globex', 'Acme', 'Initech'])
  })

  it('sorts applications by newest and oldest application date', () => {
    renderApplications()
    const companyCells = () => within(screen.getByRole('table')).getAllByRole('cell').filter((cell) => ['Acme', 'Globex', 'Initech'].includes(cell.textContent))
    fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'newest' } })
    expect(companyCells().map((cell) => cell.textContent)).toEqual(['Initech', 'Globex', 'Acme'])
    fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'oldest' } })
    expect(companyCells().map((cell) => cell.textContent)).toEqual(['Acme', 'Globex', 'Initech'])
  })

  it('shows a no-results message with a clear-filter action', () => {
    renderApplications()
    fireEvent.change(screen.getByLabelText('Search applications'), { target: { value: 'unknown' } })
    expect(screen.getByText('No matching applications')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getByText('3 applications')).toBeInTheDocument()
  })

  it('renders empty application state and responsive board status columns', () => {
    const { rerender } = renderApplications([])
    expect(screen.getByText('No applications yet')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Board' }))
    expect(screen.getByText('No applications yet')).toBeInTheDocument()
    rerender(<Applications applications={applications} onAdd={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />)
    expect(screen.getByLabelText('Wishlist applications')).toBeInTheDocument()
    expect(screen.getByLabelText('Interview applications')).toBeInTheDocument()
    expect(within(screen.getByLabelText('Interview applications')).getByText('Globex')).toBeInTheDocument()
  })
})
