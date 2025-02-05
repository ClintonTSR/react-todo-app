import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateTodoRequest, Todo, UpdateTodoRequest } from './todo.type'
import { PaginatedResponse } from '../lib/cursor'
import { queryClient } from '../main'

export const useGetTodoByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['todo', id],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/todo/${id}`
            )
            return await response.json()
        },
    })
}

export const useGetTodosQuery = (queries: { limit: number }) => {
    return useInfiniteQuery<PaginatedResponse<Todo>>({
        queryKey: ['todos', queries],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams()
            params.append('limit', String(queries.limit))

            if (pageParam) {
                params.append('afterCursor', pageParam as string)
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/todo?${params.toString()}`
            )
            return await response.json()
        },
        getNextPageParam: (data) => {
            return data.cursor.afterCursor
        },
        getPreviousPageParam: (data) => {
            return data.cursor.beforeCursor
        },
        initialPageParam: null,
    })
}

export const useCreateTodoMutation = () => {
    return useMutation({
        mutationFn: async (todo: CreateTodoRequest) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/todo`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(todo),
                }
            )
            return response.json()
        },
    })
}

export const useUpdateTodoMutation = () => {
    return useMutation({
        mutationFn: async (todo: UpdateTodoRequest) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/todo/${todo.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(todo),
                }
            )
            return response.json()
        },
        onSuccess: (data: Todo) => {
            queryClient.invalidateQueries({ queryKey: ['todo']})
        },
    })
}

export const useDeleteTodoMutation = (id: string) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/todo/${id}`,
                {
                    method: 'DELETE',
                }
            )
            return response.json()
        },
    })
}
