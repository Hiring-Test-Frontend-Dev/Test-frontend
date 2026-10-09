import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ThemeToggle } from './ThemeToggle'

export default function Layout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-[100dvh] bg-surface-50 dark:bg-surface-900">
      <header className="border-b border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-end gap-1 px-4 py-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => logout().then(() => navigate('/login'))}
            className="text-sm text-surface-600 dark:text-surface-300 px-2 py-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-10">
        <Outlet />
      </main>
    </div>
  )
}
