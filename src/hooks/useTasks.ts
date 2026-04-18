import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChildren, getStats, createTask, updateStatus, updateTask, deleteTask, getRootTasks, updateParent } from '../api/tasks'

export function useChildren(id?: number) {
  return useQuery({
    queryKey: ['tasks', id ?? 'root'],
    queryFn: () => id ? getChildren(id) : getRootTasks(),
  })
}
export function useStats() {
    return useQuery({
        queryKey: ['stats'],
        queryFn: getStats,
    })
}

export function useCreateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ title, parent_id, note, icon }: { title: string; parent_id?: number; note?: string | null; icon?: string }) =>
            createTask(title, parent_id, note, icon),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', variables.parent_id ?? 'root'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
        },
    })
}

export function useUpdateStatus() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
        },
    })
}

export function useDeleteTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
        },
    })
}

export function useUpdateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, title, status, note, icon }: { id: number; title: string; status: string; note?: string | null; icon: string }) =>
            updateTask(id, { title, status, note, icon }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export function useUpdateParent() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, parent_id }: { id: number; parent_id: number | null }) =>
            updateParent(id, parent_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}