import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChildren, getStats, createTask, updateStatus, deleteTask, getRootTasks, updateParent } from '../api/tasks'

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
        mutationFn: ({ title, parent_id }: { title: string; parent_id?: number }) =>
            createTask(title, parent_id),
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