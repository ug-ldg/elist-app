import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTask } from '../../api/tasks'

export default function Topbar({ parentID }: { parentID?: number }) {
  const navigate = useNavigate()

  const { data: task } = useQuery({
    queryKey: ['task', parentID],
    queryFn: () => getTask(parentID!),
    enabled: !!parentID,
  })

  return (
    <div className="h-14 bg-white border-b border-[#E5E5EA] flex items-center px-6 gap-2">
      {parentID && (
        <button
          onClick={() => navigate(-1)}
          className="bg-none border-none text-xl cursor-pointer text-[#007AFF] px-2 py-1 rounded-lg"
        >
          ‹
        </button>
      )}
      <span onClick={() => navigate('/')} className="text-sm text-[#007AFF] cursor-pointer">
        eList
      </span>
      {task && (
        <>
          <span className="text-[#8E8E93]">/</span>
          <span className="text-sm text-[#1C1C1E] font-semibold">{task.title}</span>
        </>
      )}
    </div>
  )
}
