import type { Task } from '../../types/task'
import FileItem from './FileItem'
import NewTaskModal from './NewTaskModal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DndContext, PointerSensor, useSensor, useSensors, useDroppable, pointerWithin, DragOverlay } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useUpdateParent } from '../../hooks/useTasks'
import { useQuery } from '@tanstack/react-query'
import { getTask } from '../../api/tasks'

function ParentDropZone() {
  const { setNodeRef, isOver } = useDroppable({ id: 'parent-zone' })
  const { t } = useTranslation()

  return (
    <div
      ref={setNodeRef}
      className={`mb-4 p-3 rounded-xl border-2 border-dashed flex items-center gap-2 text-sm transition-colors ${
        isOver
          ? 'border-[#007AFF] bg-blue-50 text-[#007AFF]'
          : 'border-[#E5E5EA] text-[#8E8E93]'
      }`}
    >
      <span className="pointer-events-none">⬆</span>
      <span className="pointer-events-none">{t('tasks.move_to_parent')}</span>
    </div>
  )
}

export default function FileGrid({ tasks, parentID }: { tasks: Task[]; parentID?: number }) {
  const [showModal, setShowModal] = useState(false)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const { t } = useTranslation()
  const updateParent = useUpdateParent()

  const { data: currentFolder } = useQuery({
    queryKey: ['task', parentID],
    queryFn: () => getTask(parentID!),
    enabled: !!parentID,
  })

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  }))

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find(t => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const draggedID = active.id as number

    if (over.id === 'parent-zone') {
      updateParent.mutate({ id: draggedID, parent_id: currentFolder?.parent_id ?? null })
      return
    }

    updateParent.mutate({ id: draggedID, parent_id: over.id as number })
  }

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div>
        {parentID && <ParentDropZone />}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {tasks.map(task => (
            <FileItem key={task.id} task={task} hasChildren={true} />
          ))}
          <div
            onClick={() => setShowModal(true)}
            className="bg-white rounded-xl p-4 cursor-pointer shadow-sm flex flex-col items-center justify-center gap-2 min-h-30 border-2 border-dashed border-[#E5E5EA] text-[#8E8E93] hover:border-[#007AFF] hover:text-[#007AFF] transition-colors"
          >
            <div className="text-3xl">+</div>
            <div className="text-[13px]">{t('tasks.new')}</div>
          </div>
        </div>
        {showModal && (
          <NewTaskModal parentID={parentID} onClose={() => setShowModal(false)} />
        )}
        <DragOverlay dropAnimation={null}>
          {activeTask && (
            <div className="bg-white rounded-xl p-4 shadow-xl flex flex-col gap-2 w-40 rotate-2 scale-105 cursor-grabbing opacity-95">
              <div className="text-3xl">📁</div>
              <div className="text-sm font-semibold text-[#1C1C1E]">{activeTask.title}</div>
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  )
}
