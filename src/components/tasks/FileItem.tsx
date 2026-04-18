import type { Task } from '../../types/task'
import { useNavigate } from 'react-router-dom'
import { useUpdateStatus, useDeleteTask } from '../../hooks/useTasks'

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  in_progress: 'En cours',
  done: 'Terminé',
}

const statusColors: Record<string, string> = {
  pending: 'text-[#8E8E93]',
  in_progress: 'text-[#007AFF]',
  done: 'text-[#34C759]',
}

export default function FileItem({ task, hasChildren }: { task: Task; hasChildren: boolean }) {
  const navigate = useNavigate()
  const updateStatus = useUpdateStatus()
  const deleteTask = useDeleteTask()

  function handleClick() {
    if (hasChildren) navigate(`/tasks/${task.id}`)
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.stopPropagation()
    updateStatus.mutate({ id: task.id, status: e.target.value })
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    if (confirm(`Supprimer "${task.title}" ?`)) {
      deleteTask.mutate(task.id)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2 transition-transform duration-150 ease-in-out hover:scale-[1.02] cursor-pointer"
    >
      <div className="text-3xl">{hasChildren ? '📁' : '📄'}</div>
      <div className="text-sm font-semibold text-[#1C1C1E]">{task.title}</div>
      <div className={`text-[11px] font-semibold ${statusColors[task.status]}`}>
        {statusLabels[task.status]}
      </div>
      <select
        value={task.status}
        onChange={handleStatusChange}
        onClick={e => e.stopPropagation()}
        className="text-xs border border-[#E5E5EA] rounded-lg p-1 text-[#1C1C1E] bg-[#F2F2F7]"
      >
        <option value="pending">En attente</option>
        <option value="in_progress">En cours</option>
        <option value="done">Terminé</option>
      </select>
      <button
        onClick={handleDelete}
        className="text-xs rounded-lg py-1.5 bg-red-50 text-[#FF3B30] cursor-pointer border-none hover:bg-red-100 transition-colors"
      >
        Supprimer
      </button>
    </div>
  )
}
