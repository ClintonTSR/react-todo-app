export type Todo = {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: string
}

export type GetTodoRequest = {
    id: string
}

export type CreateTodoRequest = {
    title: string,
    description: string,
    dueDate: string
}


export type UpdateTodoRequest = CreateTodoRequest & { id: string }