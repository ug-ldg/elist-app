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
    <div className="flex h-screen bg-[#F2F2F7] font-sans">
      <Sidebar stats={stats} onHome={() => navigate('/')} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar parentID={taskID} />
        <main className="flex-1 p-6 overflow-y-auto">
          {isLoading ? (
            <p className="text-[#8E8E93]">Chargement...</p>
          ) : (
            <FileGrid tasks={tasks ?? []} parentID={taskID} />
          )}
        </main>
      </div>
    </div>
  )
}
