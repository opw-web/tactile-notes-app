# CLAUDE.md -- Tactile Studio

> Read this file completely before doing anything.

---

## Context Navigation

A knowledge graph of this codebase lives in `graphify-out/`. Use it before reading raw files.

1. **Query the graph first.** Run `/graphify query "<question>"` before opening source files.
2. **Only read raw files when the graph is insufficient** or when you need exact implementation details.
3. **After significant code changes, run `/graphify --update`** to keep the graph current.

Quick reference:
- `graphify-out/graph.json` -- full graph data
- `graphify-out/GRAPH_REPORT.md` -- god nodes, communities, architecture overview
- `graphify-out/graph.html` -- interactive visualization (open in browser)

---

## What Is Tactile Studio

Tactile Studio is a mobile-optimized task management app with a neumorphic "tactile" design system. Tasks are organized on a 3x3 Priority x Effort matrix and also viewable on a date-grouped timeline.

**Core loop:** Create task -> Assign priority/effort -> View in Matrix or Timeline -> Mark done

It is NOT a notes app. It is NOT a project management tool. It is a personal task organizer with a unique spatial (matrix) interface.

---

## Tech Stack (Locked)

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2 |
| Build Tool | Vite | 8.0 |
| Routing | react-router-dom | 7.15 |
| Backend/Auth | Supabase (hosted PostgreSQL + Auth) | JS SDK 2.105 |
| Auth Provider | Google OAuth (via Supabase) | -- |
| Design System | Custom neumorphic CSS (`tactile.css`) | -- |
| Fonts | Space Grotesk (display), Manrope (body), JetBrains Mono (mono) | Google Fonts |
| Deployment | Vercel | SPA mode with rewrites |

### Package Manager
Use **npm**. No lock file for yarn or pnpm exists.

### Commands
```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## Project Structure

```
notes-app/
├── CLAUDE.md                     # THIS FILE
├── .claude/
│   └── commit-log.md             # Auto-appended commit history (post-commit hook)
├── .githooks/
│   └── post-commit               # Appends to commit-log.md after every commit
├── graphify-out/                 # Knowledge graph (auto-generated)
├── index.html                    # Entry HTML (loads Google Fonts)
├── package.json
├── vite.config.js                # Minimal: just react plugin
├── vercel.json                   # SPA rewrites: all routes -> /
├── supabase-schema.sql           # One-time DB bootstrap (run in Supabase SQL Editor)
├── .env                          # Supabase credentials (gitignored)
├── src/
│   ├── main.jsx                  # React root, imports tactile.css
│   ├── App.jsx                   # BrowserRouter + route definitions + auth gates
│   ├── context/
│   │   └── TaskContext.jsx       # Central state: tasks CRUD, auth, constants
│   ├── lib/
│   │   └── supabase.js           # Supabase client (reads VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
│   ├── screens/
│   │   ├── Login.jsx             # Google OAuth sign-in
│   │   ├── Onboarding.jsx        # 3-step intro wizard (stores flag in localStorage)
│   │   ├── Matrix.jsx            # 3x3 priority/effort grid with drag-and-drop
│   │   ├── Timeline.jsx          # Date-grouped task list with overdue indicators
│   │   ├── NewTask.jsx           # Bottom sheet: create task with wheels/toggles
│   │   ├── TaskDetail.jsx        # Half-sheet + full-screen edit view
│   │   └── Settings.jsx          # Profile, preferences, theme, data export
│   ├── components/
│   │   ├── Badge.jsx             # Color-coded tag badge
│   │   ├── BottomNav.jsx         # 3-tab navigation (Matrix/Timeline/Settings)
│   │   ├── FAB.jsx               # Floating action button (+ icon)
│   │   ├── Icons.jsx             # All SVG icon components
│   │   ├── PillSwitch.jsx        # Segmented control (priority/effort/theme selectors)
│   │   ├── StatusBar.jsx         # Fake iOS status bar (time, signal, battery)
│   │   ├── TaskPill.jsx          # Draggable task card for matrix cells
│   │   ├── Toggle.jsx            # Neumorphic on/off switch
│   │   ├── TopBar.jsx            # Screen header (title, subtitle, action buttons)
│   │   └── Wheel.jsx             # Scroll-wheel picker (dates, times)
│   └── styles/
│       └── tactile.css           # Full design system (CSS variables, neumorphic classes)
└── dist/                         # Build output (gitignored)
```

---

## Architecture

### Auth Flow
```
/login -> Google OAuth (Supabase) -> /onboarding (if first visit) -> /matrix
```
- `LoginGate`, `OnboardingGate`, `AuthGate` in App.jsx handle routing
- Onboarding completion stored in `localStorage` keyed by user ID
- Session managed by Supabase SDK (`supabase.auth.getSession()`)

### State Management
All state flows through `TaskContext.jsx`:
- **Tasks:** fetched from Supabase `tasks` table, cached in React state
- **Auth:** derived from Supabase session (`isLoggedIn`, `hasOnboarded`, `user` details)
- **CRUD:** `addTask`, `updateTask`, `deleteTask`, `toggleDone` -- all optimistic with Supabase sync
- **Constants:** `PRIORITY_COLORS`, `PRIORITY_LABELS`, `EFFORT_LABELS`, badge kind mappings

### Database Schema
Table: `public.tasks` (PostgreSQL via Supabase, RLS enabled)
- `id` UUID (auto-generated)
- `user_id` UUID (FK to auth.users, cascade delete)
- `title` text (required)
- `description` text (default '')
- `priority` enum: 'high' | 'medium' | 'low' (default 'medium')
- `effort` enum: 'quick-win' | 'steady' | 'heavy-lift' (default 'steady')
- `date` date (default current_date)
- `time` text (nullable, format "H:MM AM/PM")
- `all_day` boolean (default true)
- `done` boolean (default false)
- `created_at` timestamptz (auto)

RLS policies: users can only CRUD their own tasks (auth.uid() = user_id).
Indexes: `tasks_user_id_idx`, `tasks_date_idx (user_id, date)`.

### Views
- **Matrix** (default): 3x3 grid, rows = priority (high/medium/low), cols = effort (quick-win/steady/heavy-lift). Tasks as draggable pills. Drag-and-drop changes priority/effort. Unbox tray shows unsorted tasks.
- **Timeline**: Tasks grouped by date sections. Overdue tasks get red left border. Checkbox, title, time badge, priority/effort badges.
- **Settings**: Profile card, haptic/sound toggles, theme selector (light/dark/auto -- not yet functional), data export/clear (not yet functional).

### Design System
`tactile.css` defines the full neumorphic system:
- **Colors:** `--color-primary` (#E6734D coral), `--color-brass` (#C2A45C gold), `--color-teal` (#4A8B82), `--color-background` (#E8E6E1 warm gray)
- **Shadows:** `--shadow-out` (raised), `--shadow-in` (inset/well), `--shadow-fab` (orange glow)
- **Surfaces:** `.card-out` (raised card), `.well` (inset container), `.sheet` (bottom sheet)
- **Typography:** `.t-display` (Space Grotesk bold), `.t-eyebrow` (uppercase label), `.t-body`, `.t-small`, `.t-btn`
- **Mobile frame:** Fixed 390x844px, centered on desktop with `#root { width: 390px }`

---

## Environment Variables

Required in `.env` (gitignored):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Known Limitations / Technical Debt

- Dates in NewTask.jsx and Timeline.jsx are hardcoded strings ("Oct 22", etc.) -- not dynamically generated
- Theme toggle (light/dark/auto) in Settings is wired to state but does not change CSS variables
- Export CSV and Clear Completed in Settings are non-functional placeholders
- Haptic feedback and mechanical sounds toggles are non-functional
- Wheel component does not support scroll/swipe gestures, only click
- No error boundaries or loading states beyond initial auth check
- No tests exist

---

## Conventions

- All components are functional using hooks. No class components.
- Inline styles are used extensively alongside CSS classes (intentional for neumorphic design).
- No TypeScript. Plain JSX.
- No state management library. React Context + useState.
- All Supabase calls go through TaskContext. Components never import supabase.js directly.
- Component naming: PascalCase files matching export name.
- Screen vs Component: Screens are full pages in `screens/`. Components are reusable pieces in `components/`.

---

## Commit History

See `.claude/commit-log.md` for a running record of all changes. This file is auto-appended by a post-commit hook after every commit.

---

## Decision Log

```
[2026-05-09] Project bootstrapped: React 19 + Vite 8 + Supabase. Single-user task app.
[2026-05-09] Design system: Custom neumorphic CSS, no component library. Mobile-first 390x844 frame.
[2026-05-09] Auth: Google OAuth via Supabase, onboarding state in localStorage.
[2026-05-09] State: Single TaskContext with optimistic updates, no React Query.
[2026-05-09] Matrix view: 3x3 grid with HTML drag-and-drop (not a library).
```
