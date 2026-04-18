import { useState } from 'react'
import { useUpdateTask } from '../../hooks/useTasks'
import { useTranslation } from 'react-i18next'
import type { Task } from '../../types/task'

const ICONS = ['📁', '📋', '⭐', '🔥', '💡', '🎯', '🚀', '✅', '📌', '🏷️', '📝', '🔧', '🎨', '📊', '🗓️', '💼', '🔑', '🎵', '🏠', '🛒']

export default function EditTaskModal({ task, onClose }: { task: Task; onClose: () => void }) {
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(task.status)
  const [note, setNote] = useState(task.note ?? '')
  const [icon, setIcon] = useState(task.icon)
  const updateTask = useUpdateTask()
  const { t } = useTranslation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    updateTask.mutate(
      { id: task.id, title: title.trim(), status, note: note.trim() || null, icon },
      { onSuccess: onClose },
    )
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl">
        <h2 className="text-lg font-semibold text-[#1C1C1E] mb-5">{t('tasks.modal_edit_title')}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <p className="text-xs font-semibold text-[#8E8E93] uppercase mb-2">{t('tasks.icon')}</p>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`text-xl w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer border
                    ${icon === emoji ? 'bg-[#007AFF]/10 border-[#007AFF]' : 'bg-[#F2F2F7] border-transparent hover:bg-gray-200'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={t('tasks.placeholder')}
            className="px-3 py-3 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-[#007AFF] transition-colors"
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value as Task['status'])}
            className="px-3 py-3 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-[#007AFF] bg-white transition-colors"
          >
            <option value="pending">{t('tasks.status.pending')}</option>
            <option value="in_progress">{t('tasks.status.in_progress')}</option>
            <option value="done">{t('tasks.status.done')}</option>
          </select>

          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder={t('tasks.note_placeholder')}
            rows={3}
            className="px-3 py-3 rounded-xl border border-[#E5E5EA] text-sm outline-none focus:border-[#007AFF] transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={updateTask.isPending}
            className="bg-[#007AFF] text-white border-none rounded-xl py-3 text-sm font-semibold cursor-pointer hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {t('tasks.save')}
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
