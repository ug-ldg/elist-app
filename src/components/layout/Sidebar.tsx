import type { Stats } from '../../types/task'
import { useAuth } from '../../hooks/useAuth'

export default function Sidebar({ stats, onHome }: { stats?: Stats; onHome: () => void }) {
  const { logout } = useAuth()

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E5E5EA',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      gap: '24px',
    }}>
      <div
        onClick={onHome}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontSize: '24px' }}>📋</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#1C1C1E' }}>eList</span>
      </div>

      {stats && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#8E8E93', margin: 0, textTransform: 'uppercase' }}>
            Statistiques
          </p>
          <StatRow label="Total" value={stats.total_tasks} />
          <StatRow label="En attente" value={stats.pending} color="#8E8E93" />
          <StatRow label="En cours" value={stats.total_tasks - stats.pending - stats.done} color="#007AFF" />
          <StatRow label="Terminées" value={stats.done} color="#34C759" />
          <StatRow label="Dossiers" value={stats.root_tasks} />
        </div>
      )}

      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={logout}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#F2F2F7',
            color: '#FF3B30',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  )
}

function StatRow({ label, value, color = '#1C1C1E' }: { label: string; value: number; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '13px', color: '#3A3A3C' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color }}>{value}</span>
    </div>
  )
}
