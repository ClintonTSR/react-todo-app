import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateTodoRequest, Todo, UpdateTodoRequest } from "./todo.type";

export const getTodoById = (id: string) => {
    return useQuery({
        queryKey: ['todo', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`);
            return await response.json();
        }
    })
}

export const getTodos = () => {
    return useQuery<Todo>({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todo`);
            return await response.json();
        }
    })
}

export const createTodo = (todo: CreateTodoRequest) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            return response.json();
        }
    })
}

export const updateTodo = (todo: UpdateTodoRequest) => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todo/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });
            return response.json();
        }
    })
}