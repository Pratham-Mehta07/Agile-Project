import { Menu } from 'lucide-react'

export default function Header({ title, onMenuOpen }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button onClick={onMenuOpen} className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu size={21} /></button>
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
    </header>
  )
}
