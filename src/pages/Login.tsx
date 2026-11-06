import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

const DEMO_EMAIL = 'demo@verifi.test'
const DEMO_PASSWORD = 'demo1234'

export default function Login() {
  const navigate = useNavigate()
  const { loginWithEmail } = useAuth()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await loginWithEmail(email.trim(), password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-surface-50 dark:bg-surface-900">
      <header className="flex items-center justify-end px-4 py-3">
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-surface-900 dark:text-white">Sign in</h1>
          <p className="mt-1 mb-6 text-sm text-surface-500">
            {DEMO_EMAIL} / {DEMO_PASSWORD}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={setEmail}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={setPassword}
              required
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
