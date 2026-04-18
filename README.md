# eList — Frontend

A React + TypeScript frontend for the [eList API](https://github.com/ug-ldg/elist-backend), built as a portfolio project. The interface is inspired by iOS's Files app — tasks are displayed as a navigable file system where root tasks are folders and subtasks are files.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **React Router v6** — client-side navigation
- **TanStack Query** — server state management, caching, and synchronization
- **Axios** — HTTP client with JWT interceptor
- **react-i18next** — internationalization (EN, FR, ES, JA)
- **@dnd-kit/core** — drag & drop
- **flag-icons** — CSS flag icons (Windows-compatible)

## Key Engineering Concepts Demonstrated

### Server State with TanStack Query
Rather than managing loading/error/data state manually with `useState`, all API calls go through TanStack Query hooks. This provides automatic caching, background refetching, and optimistic invalidation after mutations — with minimal boilerplate.

```
useChildren(id)     → GET /tasks or GET /tasks/{id}/children
useStats()          → GET /stats
useCreateTask()     → POST /tasks                  → invalidates task list + stats
useUpdateStatus()   → PATCH /tasks/{id}/status     → invalidates task list + stats
useUpdateTask()     → PATCH /tasks/{id}            → invalidates task list
useDeleteTask()     → DELETE /tasks/{id}           → invalidates task list + stats
useUpdateParent()   → PATCH /tasks/{id}/parent     → invalidates task list
```

### JWT Authentication Flow
1. User clicks "Sign in with Google" → redirected to the API's OAuth endpoint
2. API handles Google OAuth and redirects back with `?token=<jwt>`
3. Token is captured from URL params, stored in `localStorage`
4. Axios interceptor attaches `Authorization: Bearer <token>` to every request
5. `ProtectedRoute` guards all non-public pages

### File Manager Metaphor
Tasks map to filesystem concepts:
| API concept | UI representation |
|---|---|
| Root task | Folder |
| Navigate into task | Open folder |
| Breadcrumb | Current path in hierarchy (max 5 levels visible) |
| `status: pending` | Grey dot |
| `status: in_progress` | Orange dot |
| `status: done` | Green dot |

Each task card displays: customizable icon, title (truncated at 50 chars), status indicator, creation and modification dates, edit and delete actions.

### Internationalization (i18n)
The UI supports 4 languages switchable at runtime via a flag dropdown in the sidebar:

| Code | Language |
|------|----------|
| `en` | English  |
| `fr` | Français |
| `es` | Español  |
| `ja` | 日本語   |

The selected language is persisted to `localStorage`. Translations live in `src/i18n/locales/*.json`. Flag icons use the `flag-icons` CSS library (native flag emojis are not rendered on Windows).

### Drag & Drop Task Reorganization
Tasks can be reorganized by dragging cards onto each other or onto a "move to parent" drop zone:

- **Drop on a folder** → moves the dragged task inside that folder
- **Drop on the parent zone** (top of screen) → moves the task up one level
- Drag is activated after moving the pointer **8px** (prevents accidental drags on click)
- A **drag overlay** follows the cursor during the drag for visual feedback
- Uses `pointerWithin` collision detection to avoid false positives from adjacent cards

### Display Preferences
A sidebar "Options > Display" panel lets users toggle card fields on/off:
- Icon, status indicator, creation date, modification date
- Preferences are persisted to `localStorage` and synced across all cards in real time via a module-level pub/sub pattern (no context provider needed)

### Environment-based Configuration
All URLs are driven by environment variables — no hardcoded `localhost` in the source code:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_URL=http://localhost:5173
```

Vite only exposes variables prefixed with `VITE_` to the client bundle. Switching to production requires only a `.env.production` file.

## Project Structure

```
src/
├── api/
│   ├── client.ts               # Axios instance + JWT interceptor
│   └── tasks.ts                # API functions (createTask, updateTask, etc.)
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx         # Stats + language selector + display options + logout
│   │   ├── Topbar.tsx          # Breadcrumb (max 5 levels, truncated at 25 chars)
│   │   └── LanguageSelector.tsx # Flag dropdown, persisted to localStorage
│   └── tasks/
│       ├── FileGrid.tsx        # Task grid + drag context + drag overlay
│       ├── FileItem.tsx        # Task card (draggable + droppable)
│       ├── NewTaskModal.tsx    # Create task (title, note, icon)
│       ├── EditTaskModal.tsx   # Edit task (title, status, note, icon)
│       └── DeleteTaskModal.tsx # Delete confirmation modal
├── hooks/
│   ├── useAuth.ts              # JWT read/write helpers
│   ├── useTasks.ts             # TanStack Query hooks
│   └── useDisplayPreferences.ts # Display toggles persisted to localStorage
├── i18n/
│   ├── index.ts                # i18next config
│   └── locales/                # en.json, fr.json, es.json, ja.json
├── pages/
│   ├── LoginPage.tsx           # Google OAuth entry point
│   └── ExplorerPage.tsx        # Main file manager view
├── types/
│   └── task.ts                 # TypeScript interfaces (Task, TaskNode, Stats)
└── main.tsx                    # Router + QueryClient setup
```

## Getting Started

**Prerequisites:** Node 18+, [eList API](https://github.com/ug-ldg/elist-backend) running on port 8080

```bash
npm install
npm run dev
```

Create a `.env` file at the root:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_URL=http://localhost:5173
```

The app will be available at `http://localhost:5173`.

> Authentication requires the backend to be running with valid Google OAuth credentials configured.
