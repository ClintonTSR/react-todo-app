export type Todo = {
    id: string,
    name: string,
    description: string,
    dueDate: Date,
    status: string
}

export type GetTodoRequest = {
    id: string
}

export type CreateTodoRequest = {
    name: string,
    description: string,
    dueDate: string
}


export type UpdateTodoRequest = CreateTodoRequest & { id: string }