import type { Task } from '../../types/task'
import FileItem from './FileItem'
import NewTaskModal from './NewTaskModal'
import { useState } from 'react'

export default function FileGrid({ tasks, parentID }: { tasks: Task[]; parentID?: number }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {tasks.map(task => (
          <FileItem key={task.id} task={task} hasChildren={true} />
        ))}
        <div
          onClick={() => setShowModal(true)}
          className="bg-white rounded-xl p-4 cursor-pointer shadow-sm flex flex-col items-center justify-center gap-2 min-h-30 border-2 border-dashed border-[#E5E5EA] text-[#8E8E93] hover:border-[#007AFF] hover:text-[#007AFF] transition-colors"
        >
          <div className="text-3xl">+</div>
          <div className="text-[13px]">Nouvelle tâche</div>
        </div>
      </div>
      {showModal && (
        <NewTaskModal parentID={parentID} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
