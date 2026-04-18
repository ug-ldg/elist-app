import { useParams, useNavigate } from 'react-router-dom'
import { useChildren, useStats } from '../hooks/useTasks'
import FileGrid from '../components/tasks/FileGrid'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'

export default function ExplorerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const taskID = id ? parseInt(id) : undefined
  const { data: tasks, isLoading } = useChildren(taskID)
  const { data: stats } = useStats()

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F2F2F7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      <Sidebar stats={stats} onHome={() => navigate('/')} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar parentID={taskID} />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {isLoading ? (
            <p style={{ color: '#8E8E93' }}>Chargement...</p>
          ) : (
            <FileGrid tasks={tasks ?? []} parentID={taskID} />
          )}
        </main>
      </div>
    </div>
  )
}