import { useDeleteTask } from '../../hooks/useTasks'
import { useTranslation } from 'react-i18next'

export default function DeleteTaskModal({ taskId, title, onClose }: { taskId: number; title: string; onClose: () => void }) {
  const deleteTask = useDeleteTask()
  const { t } = useTranslation()

  function handleConfirm() {
    deleteTask.mutate(taskId, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-80 shadow-2xl">
        <h2 className="text-lg font-semibold text-[#1C1C1E] mb-2">{t('tasks.delete')}</h2>
        <p className="text-sm text-[#8E8E93] mb-5">{t('tasks.confirm_delete', { title })}</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            disabled={deleteTask.isPending}
            className="bg-[#FF3B30] text-white border-none rounded-xl py-3 text-sm font-semibold cursor-pointer hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {t('tasks.delete')}
          </button>
          <button
            onClick={onClose}
            className="bg-[#F2F2F7] text-[#1C1C1E] border-none rounded-xl py-3 text-sm cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {t('tasks.cancel')}
          </button>
        </div>
      </div>
    </div>
  )
}
