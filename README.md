# eList — Frontend

A React + TypeScript frontend for the [eList API](https://github.com/ug-ldg/elist-backend), built as a portfolio project. The interface is inspired by iOS's Files app — tasks are displayed as a navigable file system where root tasks are folders and subtasks are files.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **React Router v6** — client-side navigation
- **TanStack Query** — server state management, caching, and synchronization
- **Axios** — HTTP client with JWT interceptor

## Key Engineering Concepts Demonstrated

### Server State with TanStack Query
Rather than managing loading/error/data state manually with `useState`, all API calls go through TanStack Query hooks. This provides automatic caching, background refetching, and optimistic invalidation after mutations — with minimal boilerplate.

```
useChildren(id)     → GET /tasks or GET /tasks/{id}/children
useStats()          → GET /stats
useCreateTask()     → POST /tasks  → invalidates task list + stats
useUpdateStatus()   → PATCH /tasks/{id}/status → invalidates task list + stats
useDeleteTask()     → DELETE /tasks/{id} → invalidates task list + stats
```

### JWT Authentication Flow
1. User clicks "Se connecter avec Google" → redirected to the API's OAuth endpoint
2. API handles Google OAuth and redirects back with `?token=<jwt>`
3. Token is captured from URL params, stored in `localStorage`
4. Axios interceptor attaches `Authorization: Bearer <token>` to every request
5. `ProtectedRoute` guards all non-public pages

### File Manager Metaphor
Tasks map to filesystem concepts:
| API concept | UI representation |
|---|---|
| Root task | Folder (📁) |
| Subtask | File (📄) |
| Navigate into task | Open folder |
| Breadcrumb | Current path in hierarchy |
| `status: pending` | Grey label |
| `status: in_progress` | Blue label |
| `status: done` | Green label |

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
│   ├── client.ts         # Axios instance + JWT interceptor
│   └── tasks.ts          # API functions (createTask, getChildren, etc.)
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx   # Stats panel + navigation
│   │   └── Topbar.tsx    # Breadcrumb navigation
│   └── tasks/
│       ├── FileGrid.tsx  # Task grid layout + new task button
│       ├── FileItem.tsx  # Individual task card (folder or file)
│       └── NewTaskModal.tsx
├── hooks/
│   ├── useAuth.ts        # JWT read/write helpers
│   └── useTasks.ts       # TanStack Query hooks
├── pages/
│   ├── LoginPage.tsx     # Google OAuth entry point
│   └── ExplorerPage.tsx  # Main file manager view
├── types/
│   └── task.ts           # TypeScript interfaces (Task, TaskNode, Stats)
└── main.tsx              # Router + QueryClient setup
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
