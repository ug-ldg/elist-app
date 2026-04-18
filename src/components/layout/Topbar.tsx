import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAncestors } from '../../api/tasks'

export default function Topbar({ parentID }: { parentID?: number }) {
  const navigate = useNavigate()

  const { data: ancestors } = useQuery({
    queryKey: ['ancestors', parentID],
    queryFn: () => getAncestors(parentID!),
    enabled: !!parentID,
  })

  return (
    <div className="h-14 bg-white border-b border-[#E5E5EA] flex items-center px-6 gap-2">
      <span onClick={() => navigate('/')} className="text-sm text-[#007AFF] cursor-pointer hover:underline">
        eList
      </span>
      {ancestors && (() => {
        const truncate = (s: string) => s.length > 25 ? s.slice(0, 25) + '…' : s
        const visible = ancestors.length > 5
          ? [null, ...ancestors.slice(-5)]
          : ancestors

        return visible.map((crumb, i) => (
          <span key={crumb ? crumb.id : '…'} className="flex items-center gap-2">
            <span className="text-[#8E8E93]">/</span>
            {crumb === null ? (
              <span className="text-sm text-[#8E8E93]">…</span>
            ) : i < visible.length - 1 ? (
              <span
                onClick={() => navigate(`/tasks/${crumb.id}`)}
                className="text-sm text-[#007AFF] cursor-pointer hover:underline"
              >
                {truncate(crumb.title)}
              </span>
            ) : (
              <span className="text-sm text-[#1C1C1E] font-semibold">
                {truncate(crumb.title)}
              </span>
            )}
          </span>
        ))
      })()}
    </div>
  )
}
