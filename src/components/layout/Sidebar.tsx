import type { Stats } from '../../types/task'
import { useAuth } from '../../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'
import { useDisplayPreferences } from '../../hooks/useDisplayPreferences'

export default function Sidebar({ stats, onHome }: { stats?: Stats; onHome: () => void }) {
  const { logout } = useAuth()
  const { t } = useTranslation()
  const { prefs, toggle } = useDisplayPreferences()

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

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide m-0">
          {t('sidebar.options')}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-[#3A3A3C] m-0">{t('sidebar.display')}</p>
          <ToggleRow
            label={t('sidebar.show_icon')}
            checked={prefs.showIcon}
            onChange={() => toggle('showIcon')}
          />
          <ToggleRow
            label={t('sidebar.show_status')}
            checked={prefs.showStatus}
            onChange={() => toggle('showStatus')}
          />
          <ToggleRow
            label={t('sidebar.show_created_at')}
            checked={prefs.showCreatedAt}
            onChange={() => toggle('showCreatedAt')}
          />
          <ToggleRow
            label={t('sidebar.show_updated_at')}
            checked={prefs.showUpdatedAt}
            onChange={() => toggle('showUpdatedAt')}
          />
        </div>
      </div>

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

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[13px] text-[#3A3A3C]">{label}</span>
      <button
        onClick={onChange}
        className={`w-9 h-5 rounded-full transition-colors cursor-pointer border-none relative ${checked ? 'bg-[#007AFF]' : 'bg-[#E5E5EA]'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${checked ? 'left-4' : 'left-0.5'}`} />
      </button>
    </div>
  )
}
