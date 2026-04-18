import type { Task } from '../../types/task'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useState } from 'react'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'
import { useDisplayPreferences } from '../../hooks/useDisplayPreferences'

export default function FileItem({ task, hasChildren }: { task: Task; hasChildren: boolean }) {
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const { t } = useTranslation()
  const { prefs } = useDisplayPreferences()

  const { attributes, listeners, setNodeRef: setDragRef, isDragging } = useDraggable({ id: task.id })
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: task.id })

  function handleClick() {
    if (!isDragging && hasChildren) navigate(`/tasks/${task.id}`)
  }

  function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation()
    setShowDelete(true)
  }

  function handleEditClick(e: React.MouseEvent) {
    e.stopPropagation()
    setShowEdit(true)
  }

  return (
    <>
      <div
        ref={node => { setDragRef(node); setDropRef(node) }}
        onClick={handleClick}
        className={`relative bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2 transition-all duration-150 cursor-pointer active:cursor-grabbing
          ${isDragging ? 'opacity-40 scale-95' : 'hover:scale-[1.02]'}
          ${isOver ? 'ring-2 ring-[#007AFF]' : ''}
        `}
        {...attributes}
        {...listeners}
      >
        {prefs.showStatus && <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className={`text-[10px] font-medium ${
            task.status === 'done' ? 'text-[#34C759]' :
            task.status === 'in_progress' ? 'text-[#FF9500]' :
            'text-[#8E8E93]'
          }`}>{t(`tasks.status.${task.status}`)}</span>
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            task.status === 'done' ? 'bg-[#34C759]' :
            task.status === 'in_progress' ? 'bg-[#FF9500]' :
            'bg-[#8E8E93]'
          }`} />
        </div>}
        {prefs.showIcon && <div className="absolute top-3 left-4 text-xl leading-none">{task.icon}</div>}
        <div className="h-5" />
        <div className="text-sm font-semibold text-[#1C1C1E] grow wrap-break-word">
          {task.title.length > 50 ? task.title.slice(0, 50) + '…' : task.title}
        </div>
        {prefs.showCreatedAt && (
          <div className="text-[11px] text-[#8E8E93]">
            <span className="font-semibold">{t('tasks.created_at')} </span>
            {new Date(task.created_at).toLocaleDateString()}
          </div>
        )}
        {prefs.showUpdatedAt && (
          <div className="text-[11px] text-[#8E8E93]">
            <span className="font-semibold">{t('tasks.updated_at')} </span>
            {new Date(task.updated_at).toLocaleDateString()}
          </div>
        )}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleEditClick}
            title={t('tasks.edit')}
            className="rounded-lg py-1 px-2 text-xs bg-[#F2F2F7] text-[#1C1C1E] cursor-pointer border-none hover:bg-gray-200 transition-colors"
          >
            ✏️
          </button>
          <button
            onClick={handleDeleteClick}
            title={t('tasks.delete')}
            className="rounded-lg py-1 px-2 text-xs bg-[#FF3B30] text-white cursor-pointer border-none hover:bg-red-600 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
      {showDelete && (
        <DeleteTaskModal
          taskId={task.id}
          title={task.title}
          onClose={() => setShowDelete(false)}
        />
      )}
      {showEdit && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  )
}
