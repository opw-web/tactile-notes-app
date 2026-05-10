# Graph Report - .  (2026-05-10)

## Corpus Check
- Corpus is ~11,082 words - fits in a single context window. You may not need a graph.

## Summary
- 145 nodes · 123 edges · 41 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Auth & Routing|Auth & Routing]]
- [[_COMMUNITY_Social Icons|Social Icons]]
- [[_COMMUNITY_UI Icon Components|UI Icon Components]]
- [[_COMMUNITY_Core App Loop|Core App Loop]]
- [[_COMMUNITY_Shared UI Components|Shared UI Components]]
- [[_COMMUNITY_Haptic & Sound Feedback|Haptic & Sound Feedback]]
- [[_COMMUNITY_App Shell & Gates|App Shell & Gates]]
- [[_COMMUNITY_Task State Management|Task State Management]]
- [[_COMMUNITY_Timeline View|Timeline View]]
- [[_COMMUNITY_Onboarding Flow|Onboarding Flow]]
- [[_COMMUNITY_Task Detail View|Task Detail View]]
- [[_COMMUNITY_Date Utilities|Date Utilities]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Build Tooling|Build Tooling]]
- [[_COMMUNITY_New Task Creation|New Task Creation]]
- [[_COMMUNITY_Login Screen|Login Screen]]
- [[_COMMUNITY_Settings Screen|Settings Screen]]
- [[_COMMUNITY_Matrix View|Matrix View]]
- [[_COMMUNITY_Task Pill|Task Pill]]
- [[_COMMUNITY_Pill Switch|Pill Switch]]
- [[_COMMUNITY_FAB Button|FAB Button]]
- [[_COMMUNITY_Toggle Switch|Toggle Switch]]
- [[_COMMUNITY_Badge Component|Badge Component]]
- [[_COMMUNITY_Top Bar|Top Bar]]
- [[_COMMUNITY_Scroll Wheel|Scroll Wheel]]
- [[_COMMUNITY_Bottom Navigation|Bottom Navigation]]
- [[_COMMUNITY_Sheet Animation|Sheet Animation]]
- [[_COMMUNITY_Feedback Hook|Feedback Hook]]
- [[_COMMUNITY_React Compiler|React Compiler]]
- [[_COMMUNITY_Knowledge Graph|Knowledge Graph]]
- [[_COMMUNITY_Tech Stack Rationale|Tech Stack Rationale]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_ESLint Setup|ESLint Setup]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_Supabase Client|Supabase Client]]
- [[_COMMUNITY_Task Detail Doc|Task Detail Doc]]
- [[_COMMUNITY_Icons Doc|Icons Doc]]
- [[_COMMUNITY_Status Bar Doc|Status Bar Doc]]
- [[_COMMUNITY_Top Bar Doc|Top Bar Doc]]
- [[_COMMUNITY_God Nodes Analysis|God Nodes Analysis]]
- [[_COMMUNITY_Knowledge Gaps|Knowledge Gaps]]

## God Nodes (most connected - your core abstractions)
1. `SVG Icon Sprite Sheet` - 8 edges
2. `TaskContext.jsx Central State` - 7 edges
3. `Auth Flow (Login -> OAuth -> Onboarding -> Matrix)` - 7 edges
4. `feedback()` - 6 edges
5. `Supabase Backend/Auth` - 5 edges
6. `Matrix.jsx Screen` - 5 edges
7. `playTone()` - 4 edges
8. `Vite Build Tool` - 4 edges
9. `NewTask.jsx Screen` - 4 edges
10. `Settings.jsx Screen` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Community: Task State Management` --semantically_similar_to--> `TaskContext.jsx Central State`  [INFERRED] [semantically similar]
  graphify-out/GRAPH_REPORT.md → CLAUDE.md
- `Community: Auth & Routing Gates` --semantically_similar_to--> `Auth Flow (Login -> OAuth -> Onboarding -> Matrix)`  [INFERRED] [semantically similar]
  graphify-out/GRAPH_REPORT.md → CLAUDE.md
- `SVG Icon Sprite Sheet` --conceptually_related_to--> `React + Vite Template Documentation`  [INFERRED]
  public/icons.svg → README.md
- `Favicon - Purple Lightning Bolt` --conceptually_related_to--> `Vite Build Tool`  [INFERRED]
  public/favicon.svg → README.md
- `Community: Build Tooling & Branding` --semantically_similar_to--> `Vite 8.0`  [INFERRED] [semantically similar]
  graphify-out/GRAPH_REPORT.md → CLAUDE.md

## Hyperedges (group relationships)
- **Authentication Pipeline (Login -> OAuth -> Onboarding -> Matrix)** — claude_md_auth_flow, claude_md_login, claude_md_google_oauth, claude_md_supabase, claude_md_onboarding, claude_md_matrix [EXTRACTED 1.00]
- **Task CRUD Data Flow (TaskContext -> Supabase -> tasks table)** — claude_md_task_context, claude_md_supabase_js, claude_md_supabase, claude_md_tasks_table, claude_md_optimistic_updates [EXTRACTED 1.00]
- **Three-Tab Navigation (Matrix / Timeline / Settings)** — claude_md_bottom_nav, claude_md_matrix, claude_md_timeline, claude_md_settings [EXTRACTED 1.00]

## Communities

### Community 0 - "Auth & Routing"
Cohesion: 0.15
Nodes (16): App.jsx Router & Auth Gates, Auth Flow (Login -> OAuth -> Onboarding -> Matrix), Google OAuth Provider, Login.jsx Screen, Onboarding.jsx Screen, Optimistic Updates Pattern, Rationale: No React Query (Single TaskContext), Rationale: No State Library (Context + useState) (+8 more)

### Community 1 - "Social Icons"
Cohesion: 0.14
Nodes (15): Favicon - Purple Lightning Bolt, Bluesky Social Icon, Discord Social Icon, Documentation Icon, GitHub Social Icon, Social/Star Icon, SVG Icon Sprite Sheet, X (Twitter) Social Icon (+7 more)

### Community 2 - "UI Icon Components"
Cohesion: 0.18
Nodes (0): 

### Community 3 - "Core App Loop"
Cohesion: 0.18
Nodes (11): Core Loop: Create -> Assign -> View -> Done, HTML Drag-and-Drop (no library), main.jsx Entry Point, Matrix.jsx Screen, Neumorphic Design System, 3x3 Priority x Effort Matrix, Rationale: Custom Neumorphic CSS (No Component Library), Rationale: HTML Drag-and-Drop (Not a Library) (+3 more)

### Community 4 - "Shared UI Components"
Cohesion: 0.27
Nodes (10): Badge.jsx Component, BottomNav.jsx Component, FAB.jsx Component, NewTask.jsx Screen, PillSwitch.jsx Component, Settings.jsx Screen, Known Limitations / Technical Debt, Timeline.jsx Screen (+2 more)

### Community 5 - "Haptic & Sound Feedback"
Cohesion: 0.44
Nodes (8): feedback(), getAudioContext(), hapticHeavy(), hapticMedium(), hapticTick(), playTone(), soundSnap(), soundTick()

### Community 6 - "App Shell & Gates"
Cohesion: 0.33
Nodes (0): 

### Community 7 - "Task State Management"
Cohesion: 0.5
Nodes (0): 

### Community 8 - "Timeline View"
Cohesion: 0.67
Nodes (2): buildSections(), Timeline()

### Community 9 - "Onboarding Flow"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "Task Detail View"
Cohesion: 1.0
Nodes (2): parseTime(), TaskDetail()

### Community 11 - "Date Utilities"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "ESLint Config"
Cohesion: 0.67
Nodes (3): ESLint Configuration, Rationale: TypeScript Recommended for Production, typescript-eslint

### Community 13 - "Build Tooling"
Cohesion: 0.67
Nodes (3): Vercel Deployment, Vite 8.0, Community: Build Tooling & Branding

### Community 14 - "New Task Creation"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Login Screen"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Settings Screen"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Matrix View"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Task Pill"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Pill Switch"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "FAB Button"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Toggle Switch"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Badge Component"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Top Bar"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Scroll Wheel"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Bottom Navigation"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Sheet Animation"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Feedback Hook"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "React Compiler"
Cohesion: 1.0
Nodes (2): Rationale: React Compiler Disabled (Performance Impact), React Compiler

### Community 29 - "Knowledge Graph"
Cohesion: 1.0
Nodes (2): Graphify Knowledge Graph, Graph Report Summary (79 nodes, 54 edges, 27 communities)

### Community 30 - "Tech Stack Rationale"
Cohesion: 1.0
Nodes (2): Rationale: No TypeScript (Plain JSX), React 19.2

### Community 31 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "ESLint Setup"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "App Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Supabase Client"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Task Detail Doc"
Cohesion: 1.0
Nodes (1): TaskDetail.jsx Screen

### Community 36 - "Icons Doc"
Cohesion: 1.0
Nodes (1): Icons.jsx Component

### Community 37 - "Status Bar Doc"
Cohesion: 1.0
Nodes (1): StatusBar.jsx Component

### Community 38 - "Top Bar Doc"
Cohesion: 1.0
Nodes (1): TopBar.jsx Component

### Community 39 - "God Nodes Analysis"
Cohesion: 1.0
Nodes (1): God Nodes (SVG Icon Sprite Sheet, Vite Build Tool)

### Community 40 - "Knowledge Gaps"
Cohesion: 1.0
Nodes (1): Knowledge Gaps (13 isolated nodes, thin communities)

## Knowledge Gaps
- **42 isolated node(s):** `React Framework`, `Oxc Compiler`, `SWC Compiler`, `React Compiler`, `typescript-eslint` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `New Task Creation`** (2 nodes): `NewTask()`, `NewTask.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Login Screen`** (2 nodes): `Login()`, `Login.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Settings Screen`** (2 nodes): `Settings()`, `Settings.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Matrix View`** (2 nodes): `Matrix()`, `Matrix.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Task Pill`** (2 nodes): `TaskPill.jsx`, `TaskPill()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pill Switch`** (2 nodes): `PillSwitch()`, `PillSwitch.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FAB Button`** (2 nodes): `FAB()`, `FAB.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toggle Switch`** (2 nodes): `Toggle.jsx`, `Toggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Badge Component`** (2 nodes): `Badge()`, `Badge.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Top Bar`** (2 nodes): `TopBar.jsx`, `TopBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Wheel`** (2 nodes): `Wheel.jsx`, `Wheel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bottom Navigation`** (2 nodes): `BottomNav()`, `BottomNav.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sheet Animation`** (2 nodes): `Sheet()`, `Sheet.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Feedback Hook`** (2 nodes): `useFeedback.js`, `useFeedback()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Compiler`** (2 nodes): `Rationale: React Compiler Disabled (Performance Impact)`, `React Compiler`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Knowledge Graph`** (2 nodes): `Graphify Knowledge Graph`, `Graph Report Summary (79 nodes, 54 edges, 27 communities)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tech Stack Rationale`** (2 nodes): `Rationale: No TypeScript (Plain JSX)`, `React 19.2`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Setup`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Entry Point`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supabase Client`** (1 nodes): `supabase.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Task Detail Doc`** (1 nodes): `TaskDetail.jsx Screen`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Icons Doc`** (1 nodes): `Icons.jsx Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Status Bar Doc`** (1 nodes): `StatusBar.jsx Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Top Bar Doc`** (1 nodes): `TopBar.jsx Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `God Nodes Analysis`** (1 nodes): `God Nodes (SVG Icon Sprite Sheet, Vite Build Tool)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Knowledge Gaps`** (1 nodes): `Knowledge Gaps (13 isolated nodes, thin communities)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Matrix.jsx Screen` connect `Core App Loop` to `Auth & Routing`, `Shared UI Components`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `Auth Flow (Login -> OAuth -> Onboarding -> Matrix)` connect `Auth & Routing` to `Core App Loop`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `BottomNav.jsx Component` connect `Shared UI Components` to `Core App Loop`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `SVG Icon Sprite Sheet` (e.g. with `React + Vite Template Documentation` and `Favicon - Purple Lightning Bolt`) actually correct?**
  _`SVG Icon Sprite Sheet` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `TaskContext.jsx Central State` (e.g. with `supabase.js Client` and `Community: Task State Management`) actually correct?**
  _`TaskContext.jsx Central State` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `React Framework`, `Oxc Compiler`, `SWC Compiler` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Social Icons` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._