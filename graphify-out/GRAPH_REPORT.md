# Graph Report - .  (2026-05-09)

## Corpus Check
- Corpus is ~7,037 words - fits in a single context window. You may not need a graph.

## Summary
- 79 nodes · 54 edges · 27 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Icon Components|App Icon Components]]
- [[_COMMUNITY_Build Tooling & Branding|Build Tooling & Branding]]
- [[_COMMUNITY_External Platform Icons|External Platform Icons]]
- [[_COMMUNITY_Auth & Routing Gates|Auth & Routing Gates]]
- [[_COMMUNITY_Task State Management|Task State Management]]
- [[_COMMUNITY_Onboarding Flow|Onboarding Flow]]
- [[_COMMUNITY_Timeline View|Timeline View]]
- [[_COMMUNITY_Linting & TypeScript|Linting & TypeScript]]
- [[_COMMUNITY_Task Creation|Task Creation]]
- [[_COMMUNITY_Login Screen|Login Screen]]
- [[_COMMUNITY_Settings Screen|Settings Screen]]
- [[_COMMUNITY_Task Detail Editor|Task Detail Editor]]
- [[_COMMUNITY_Matrix View|Matrix View]]
- [[_COMMUNITY_Task Pill Component|Task Pill Component]]
- [[_COMMUNITY_Pill Switch Component|Pill Switch Component]]
- [[_COMMUNITY_Status Bar Component|Status Bar Component]]
- [[_COMMUNITY_FAB Component|FAB Component]]
- [[_COMMUNITY_Toggle Component|Toggle Component]]
- [[_COMMUNITY_Badge Component|Badge Component]]
- [[_COMMUNITY_Top Bar Component|Top Bar Component]]
- [[_COMMUNITY_Wheel Picker Component|Wheel Picker Component]]
- [[_COMMUNITY_Bottom Nav Component|Bottom Nav Component]]
- [[_COMMUNITY_React Compiler Decision|React Compiler Decision]]
- [[_COMMUNITY_Vite Configuration|Vite Configuration]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_Supabase Client|Supabase Client]]

## God Nodes (most connected - your core abstractions)
1. `SVG Icon Sprite Sheet` - 8 edges
2. `Vite Build Tool` - 4 edges
3. `React + Vite Template Documentation` - 3 edges
4. `@vitejs/plugin-react (Oxc)` - 2 edges
5. `@vitejs/plugin-react-swc (SWC)` - 2 edges
6. `ESLint Configuration` - 2 edges
7. `Favicon - Purple Lightning Bolt` - 2 edges
8. `React Framework` - 1 edges
9. `Oxc Compiler` - 1 edges
10. `SWC Compiler` - 1 edges

## Surprising Connections (you probably didn't know these)
- `SVG Icon Sprite Sheet` --conceptually_related_to--> `React + Vite Template Documentation`  [INFERRED]
  public/icons.svg → README.md
- `Favicon - Purple Lightning Bolt` --conceptually_related_to--> `Vite Build Tool`  [INFERRED]
  public/favicon.svg → README.md
- `Favicon - Purple Lightning Bolt` --conceptually_related_to--> `SVG Icon Sprite Sheet`  [INFERRED]
  public/favicon.svg → public/icons.svg

## Communities

### Community 0 - "App Icon Components"
Cohesion: 0.18
Nodes (0): 

### Community 1 - "Build Tooling & Branding"
Cohesion: 0.25
Nodes (8): Favicon - Purple Lightning Bolt, Oxc Compiler, @vitejs/plugin-react (Oxc), @vitejs/plugin-react-swc (SWC), React Framework, React + Vite Template Documentation, SWC Compiler, Vite Build Tool

### Community 2 - "External Platform Icons"
Cohesion: 0.29
Nodes (7): Bluesky Social Icon, Discord Social Icon, Documentation Icon, GitHub Social Icon, Social/Star Icon, SVG Icon Sprite Sheet, X (Twitter) Social Icon

### Community 3 - "Auth & Routing Gates"
Cohesion: 0.33
Nodes (0): 

### Community 4 - "Task State Management"
Cohesion: 0.5
Nodes (0): 

### Community 5 - "Onboarding Flow"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Timeline View"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "Linting & TypeScript"
Cohesion: 0.67
Nodes (3): ESLint Configuration, Rationale: TypeScript Recommended for Production, typescript-eslint

### Community 8 - "Task Creation"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Login Screen"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Settings Screen"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Task Detail Editor"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Matrix View"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Task Pill Component"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Pill Switch Component"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Status Bar Component"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "FAB Component"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Toggle Component"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Badge Component"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Top Bar Component"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Wheel Picker Component"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Bottom Nav Component"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "React Compiler Decision"
Cohesion: 1.0
Nodes (2): Rationale: React Compiler Disabled (Performance Impact), React Compiler

### Community 23 - "Vite Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "ESLint Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "App Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Supabase Client"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **13 isolated node(s):** `React Framework`, `Oxc Compiler`, `SWC Compiler`, `React Compiler`, `typescript-eslint` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Task Creation`** (2 nodes): `NewTask()`, `NewTask.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Login Screen`** (2 nodes): `Login()`, `Login.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Settings Screen`** (2 nodes): `Settings()`, `Settings.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Task Detail Editor`** (2 nodes): `TaskDetail.jsx`, `TaskDetail()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Matrix View`** (2 nodes): `Matrix()`, `Matrix.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Task Pill Component`** (2 nodes): `TaskPill.jsx`, `TaskPill()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pill Switch Component`** (2 nodes): `PillSwitch()`, `PillSwitch.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Status Bar Component`** (2 nodes): `StatusBar.jsx`, `StatusBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FAB Component`** (2 nodes): `FAB()`, `FAB.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Toggle Component`** (2 nodes): `Toggle.jsx`, `Toggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Badge Component`** (2 nodes): `Badge()`, `Badge.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Top Bar Component`** (2 nodes): `TopBar.jsx`, `TopBar()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Wheel Picker Component`** (2 nodes): `Wheel.jsx`, `Wheel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bottom Nav Component`** (2 nodes): `BottomNav()`, `BottomNav.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Compiler Decision`** (2 nodes): `Rationale: React Compiler Disabled (Performance Impact)`, `React Compiler`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Configuration`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Configuration`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Entry Point`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supabase Client`** (1 nodes): `supabase.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SVG Icon Sprite Sheet` connect `External Platform Icons` to `Build Tooling & Branding`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `React + Vite Template Documentation` connect `Build Tooling & Branding` to `External Platform Icons`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `SVG Icon Sprite Sheet` (e.g. with `React + Vite Template Documentation` and `Favicon - Purple Lightning Bolt`) actually correct?**
  _`SVG Icon Sprite Sheet` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `React Framework`, `Oxc Compiler`, `SWC Compiler` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._