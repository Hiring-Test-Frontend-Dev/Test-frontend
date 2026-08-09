# Frontend test (10–15 min)

Add search and a category filter to an existing transactions list.

## Getting started

1. **Clone the project**

```bash
git clone git@github.com:hiring-Test-Frontend-Dev/Test-frontend.git
cd Test-frontend
```

2. **Create your own branch** (do not work on `main`)

```bash
git checkout -b your-name/transactions-filter
```

Use your name in the branch, for example: `alex/transactions-filter`.

3. **Install and run**

```bash
npm install
npm run dev
```

Open http://localhost:5173  
Sign in with `demo@verifi.test` / `demo1234`

The list and filter UI already load. Work in `src/pages/Transactions.tsx`.

## Task

Fill in the three stub functions near the top of the file:

1. **`matchesSearch(transaction, query)`** — return `true` when `merchantName` or `name` includes the query (case-insensitive). An empty query matches all rows.
2. **`matchesCategory(transaction, category)`** — return `true` when no category is selected (`null`), or `transaction.category` equals the selected category.
3. **`getEmptyMessage(hasActiveFilters)`** — return a clear message when filters match nothing; otherwise the default empty-list message.

Client-side filtering is fine. Match the existing UI (`Input`, `Card`, `DataState`).

Amounts: **negative = out**, **positive = in**.

## If you finish early

- Debounce search
- Improve clear-filters UX
- Keyboard-friendly labels

## Do not

- Rewrite the app or `src/mocks/`
- Add a new page
- Commit directly to `main`

## Submit

When you are done, push **your branch** and share that branch (or open a pull request into `main`):

```bash
git add .
git commit -m "Implement transaction search and category filter"
git push -u origin your-name/transactions-filter
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | start the app |
| `npm run lint` | ESLint |
| `npm run build` | production build |
