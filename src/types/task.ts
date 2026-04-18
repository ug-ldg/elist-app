export type Status = 'pending' | 'in_progress' | 'done'

export interface Task {
  id: number
  user_id: number
  title: string
  parent_id?: number
  status: Status
  note?: string
  icon: string
  created_at: string
  updated_at: string
}

export interface TaskNode {
  id: number
  title: string
  status: Status
  created_at: string
  updated_at: string
  children: TaskNode[]
}

export interface Stats {
  total_tasks: number
  pending: number
  done: number
  root_tasks: number
  sub_tasks: number
}
