import { useNavigate, useParams } from 'react-router-dom'
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
    <div style={{
      height: '56px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E5EA',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '8px',
    }}>
      {parentID && (
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#007AFF',
            padding: '4px 8px',
            borderRadius: '8px',
          }}
        >
          ‹
        </button>
      )}
      <span
        onClick={() => navigate('/')}
        style={{ fontSize: '14px', color: '#007AFF', cursor: 'pointer' }}
      >
        eList
      </span>
      {task && (
        <>
          <span style={{ color: '#8E8E93' }}>/</span>
          <span style={{ fontSize: '14px', color: '#1C1C1E', fontWeight: 600 }}>
            {task.title}
          </span>
        </>
      )}
    </div>
  )
}
