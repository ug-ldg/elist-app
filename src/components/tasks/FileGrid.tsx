import type { Task } from '../../types/task'
import FileItem from './FileItem'
import NewTaskModal from './NewTaskModal'
import { useState } from 'react'

export default function FileGrid({ tasks, parentID }: { tasks: Task[]; parentID?: number }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '16px',
            }}>
                {tasks.map(task => (
                    <FileItem key={task.id} task={task} hasChildren={true} />
                ))}
                <div
                    onClick={() => setShowModal(true)}
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        minHeight: '120px',
                        border: '2px dashed #E5E5EA',
                        color: '#8E8E93',
                    }}
                >
                    <div style={{ fontSize: '32px' }}>+</div>
                    <div style={{ fontSize: '13px' }}>Nouvelle tâche</div>
                </div>
            </div>
            {showModal && (
                <NewTaskModal parentID={parentID} onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}