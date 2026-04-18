import { useState } from 'react'
import { useCreateTask } from '../../hooks/useTasks'

export default function NewTaskModal({ parentID, onClose }: { parentID?: number; onClose: () => void }) {
  const [title, setTitle] = useState('')
  const createTask = useCreateTask()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    createTask.mutate({ title, parent_id: parentID }, { onSuccess: onClose })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100,
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '32px',
        width: '320px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '18px', color: '#1C1C1E' }}>
          Nouvelle tâche
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            autoFocus
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Nom de la tâche"
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #E5E5EA',
              fontSize: '15px',
              outline: 'none',
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#007AFF',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Créer
          </button>
          <button type="button" onClick={onClose} style={{
            backgroundColor: '#F2F2F7',
            color: '#1C1C1E',
            border: 'none',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '15px',
            cursor: 'pointer',
          }}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  )
}