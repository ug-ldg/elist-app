import { useState } from 'react'
import { useCreateTask } from '../../hooks/useTasks'
import { useTranslation } from 'react-i18next'

export default function NewTaskModal({ parentID, onClose }: { parentID?: number; onClose: () => void }) {
  const [title, setTitle] = useState('')
  const createTask = useCreateTask()
  const { t } = useTranslation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    createTask.mutate({ title, parent_id: parentID }, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl">
        <h2 className="text-lg font-semibold text-[#1C1C1E] mb-5">{t('tasks.modal_title')}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={t('tasks.placeholder')}
            className="px-3 py-3 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-[#007AFF] transition-colors"
          />
          <button
            type="submit"
            className="bg-[#007AFF] text-white border-none rounded-xl py-3 text-sm font-semibold cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {t('tasks.create')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F2F2F7] text-[#1C1C1E] border-none rounded-xl py-3 text-sm cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {t('tasks.cancel')}
          </button>
        </form>
      </div>
    </div>
  )
}
