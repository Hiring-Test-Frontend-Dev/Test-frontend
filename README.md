# VeriFi AI — frontend exercise (10–15 min)

Live pairing / short screen exercise. Add search and a category filter to an existing transactions list.

## Start

Clone the task first, then create your own branch. Work stays on that branch. Do not push.

```bash
git clone https://github.com/Hiring-Test-Frontend-Dev/Test-frontend
cd Test-frontend
git checkout -b <your-name>/activity-filters
```

## Setup

```bash
npm install
npm run dev
```

http://localhost:5173 — `demo@verifi.test` / `demo1234`

Open **Activity**. The list already loads. Work in `src/pages/Transactions.tsx`.

## Task (10–15 min)

1. **Search** — filter rows by merchant or name as the user types.
2. **Category** — filter by category (chips or a select). Categories are on each transaction; you can also call `GET /transactions/categories`.
3. **Empty state** — when filters match nothing, say so. Don’t show a blank page.

Client-side filtering is fine. Match the existing UI (`Input`, `Card`, `DataState`).

Amounts: **negative = out**, **positive = in**.

## If you finish early

- Debounce search
- Combine search + category
- A “Clear filters” control
- Keyboard-friendly labels

## Do not

- Rewrite the app or `src/mocks/`
- Add a new page

## Submit

Commit on your branch. Do not push.

```bash
git add src/pages/Transactions.tsx
git commit -m "Add search and category filter to Activity"
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | start the app |
| `npm run lint` | ESLint |
