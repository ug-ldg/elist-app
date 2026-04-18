import type { Stats } from '../../types/task'
import { useAuth } from '../../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

export default function Sidebar({ stats, onHome }: { stats?: Stats; onHome: () => void }) {
  const { logout } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="w-56 bg-white border-r border-[#E5E5EA] flex flex-col p-6 gap-6">
      <div onClick={onHome} className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl">📋</span>
        <span className="text-lg font-bold text-[#1C1C1E]">eList</span>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide m-0">
          Language
        </p>
        <LanguageSelector />
      </div>

      {stats && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide m-0">
            {t('sidebar.stats')}
          </p>
          <StatRow label={t('sidebar.total')} value={stats.total_tasks} />
          <StatRow label={t('sidebar.pending')} value={stats.pending} color="text-[#8E8E93]" />
          <StatRow label={t('sidebar.in_progress')} value={stats.total_tasks - stats.pending - stats.done} color="text-[#007AFF]" />
          <StatRow label={t('sidebar.done')} value={stats.done} color="text-[#34C759]" />
          <StatRow label={t('sidebar.folders')} value={stats.root_tasks} />
        </div>
      )}

      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full py-2.5 rounded-xl bg-[#F2F2F7] text-[#FF3B30] text-sm font-semibold cursor-pointer border-none"
        >
          {t('sidebar.logout')}
        </button>
      </div>
    </div>
  )
}

function StatRow({ label, value, color = 'text-[#1C1C1E]' }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[13px] text-[#3A3A3C]">{label}</span>
      <span className={`text-[13px] font-semibold ${color}`}>{value}</span>
    </div>
  )
}
