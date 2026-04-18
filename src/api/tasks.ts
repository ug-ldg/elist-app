import client from './client'
import type { Task, Stats } from '../types/task'

export const createTask = (title: string, parent_id?: number) =>
  client.post<Task>('/tasks', { title, parent_id }).then(r => r.data)

export const getTask = (id: number) =>
  client.get<Task>(`/tasks/${id}`).then(r => r.data)

export const getChildren = (id: number) =>
  client.get<Task[]>(`/tasks/${id}/children`).then(r => r.data)

export const updateStatus = (id: number, status: string) =>
  client.patch<Task>(`/tasks/${id}/status`, { status }).then(r => r.data)

export const deleteTask = (id: number) =>
  client.delete(`/tasks/${id}`)

export const getRootTasks = () =>
  client.get<Task[]>('/tasks').then(r => r.data)

export const getStats = () =>
  client.get<Stats>('/stats').then(r => r.data)