import type { Task } from '../../types/task'
import { useNavigate } from 'react-router-dom'
import { useUpdateStatus, useDeleteTask } from '../../hooks/useTasks'

const statusColors: Record<string, string> = {
  pending: '#8E8E93',
  in_progress: '#007AFF',
  done: '#34C759',
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  in_progress: 'En cours',
  done: 'Terminé',
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
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        cursor: hasChildren ? 'pointer' : 'default',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'transform 150ms ease-in-out',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div style={{ fontSize: '32px' }}>{hasChildren ? '📁' : '📄'}</div>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1C1C1E' }}>{task.title}</div>
      <div style={{
        fontSize: '11px',
        fontWeight: 600,
        color: statusColors[task.status],
      }}>
        {statusLabels[task.status]}
      </div>
      <select
        value={task.status}
        onChange={handleStatusChange}
        onClick={e => e.stopPropagation()}
        style={{
          fontSize: '12px',
          border: '1px solid #E5E5EA',
          borderRadius: '8px',
          padding: '4px',
          color: '#1C1C1E',
          backgroundColor: '#F2F2F7',
        }}
      >
        <option value="pending">En attente</option>
        <option value="in_progress">En cours</option>
        <option value="done">Terminé</option>
      </select>
      <button
        onClick={handleDelete}
        style={{
          fontSize: '12px',
          border: 'none',
          borderRadius: '8px',
          padding: '6px',
          backgroundColor: '#FFE5E5',
          color: '#FF3B30',
          cursor: 'pointer',
        }}
      >
        Supprimer
      </button>
    </div>
  )
}