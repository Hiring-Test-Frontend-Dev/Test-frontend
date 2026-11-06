import { useEffect, useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { api } from '../services/api'
import { DataState } from '../components/ui/DataState'

interface Transaction {
  id: string
  name?: string
  merchantName?: string
  amount: number
  date: string
  category?: string
}

/**
 * Test task (10–15 min) — see README.md
 *
 * Fill in the three functions below. The list and filter UI already load.
 */

/** 1. Search — true when merchantName or name includes the query (case-insensitive). Empty query matches all. */
function matchesSearch(transaction: Transaction, query: string): boolean {
  // TODO: implement
  void transaction
  void query
  return true
}

/** 2. Category — true when category is null/"All", or transaction.category equals the selected category. */
function matchesCategory(transaction: Transaction, category: string | null): boolean {
  // TODO: implement
  void transaction
  void category
  return true
}

/** 3. Empty state — message when filters match nothing vs when there are no transactions at all. */
function getEmptyMessage(hasActiveFilters: boolean): string {
  // TODO: implement
  void hasActiveFilters
  return 'No transactions yet.'
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([
      api.get<Transaction[]>('/transactions?limit=200'),
      api.get<string[]>('/transactions/categories').catch(() => [] as string[]),
    ])
      .then(([rows, remoteCategories]) => {
        if (cancelled) return
        setTransactions(rows)
        const fromRows = rows.map((t) => t.category).filter((c): c is string => Boolean(c))
        setCategories([...new Set([...remoteCategories, ...fromRows])].sort((a, b) => a.localeCompare(b)))
      })
      .catch((err) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Could not load transactions')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    return transactions.filter(
      (t) => matchesSearch(t, query) && matchesCategory(t, category),
    )
  }, [transactions, query, category])

  const filtersActive = query.trim().length > 0 || category !== null

  const clearFilters = () => {
    setQuery('')
    setCategory(null)
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const label = (t: Transaction) => t.merchantName || t.name || 'Other'

  return (
    <div className="space-y-6">
      <div>
        <p className="page-eyebrow">Activity</p>
        <h1 className="page-title mt-1">Transactions</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-end">
        <Input
          id="transaction-search"
          label="Search"
          name="transaction-search"
          value={query}
          onChange={setQuery}
          placeholder="Merchant or name"
          autoComplete="off"
        />
        <div>
          <label
            htmlFor="category-filter"
            className="block text-[13px] font-medium text-surface-500 dark:text-surface-400 mb-1.5 tracking-tight"
          >
            Category
          </label>
          <select
            id="category-filter"
            value={category ?? ''}
            onChange={(e) => setCategory(e.target.value || null)}
            className="w-full rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-900 px-3 py-3 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-400"
          >
            <option value="">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtersActive && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}

      <DataState
        loading={loading}
        error={error}
        empty={!loading && !error && filtered.length === 0}
        emptyMessage={getEmptyMessage(filtersActive)}
        emptyAction={
          filtersActive ? (
            <Button variant="secondary" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : undefined
        }
      >
        <div className="space-y-2">
          {filtered.map((t) => (
            <Card key={t.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <p className="font-medium text-surface-900 dark:text-white truncate">{label(t)}</p>
                <p className="text-sm text-surface-500">
                  {fmtDate(t.date)}
                  {t.category && ` • ${t.category}`}
                </p>
              </div>
              <p className={`font-semibold shrink-0 ${Number(t.amount) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {Number(t.amount) < 0 ? '-' : '+'}${Math.abs(Number(t.amount)).toFixed(2)}
              </p>
            </Card>
          ))}
        </div>
      </DataState>
    </div>
  )
}
