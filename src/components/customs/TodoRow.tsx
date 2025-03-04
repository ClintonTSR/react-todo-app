import { useForm } from 'react-hook-form'
import { Todo } from '../../queries/todo.type'
import MyTextField from '../inputs/MyTextField'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Button, Chip } from '@mui/material'
import { useState } from 'react'
import {
    useCreateTodoMutation,
    useUpdateTodoMutation,
} from '../../queries/todo'
import TodoInput from './TodoInput'

const TodoRow = ({ todo }: { todo: Todo }) => {
    const [isEditing, setIsEditing] = useState(todo === null) // true if not exist
    const { mutateAsync: updateTodo } = useUpdateTodoMutation()
    const formControl = useForm<Todo>()

    function onTodoClick() {
        setIsEditing(true)
    }

    function onCloseTodo() {
        setIsEditing(false)
    }

    async function onUpdateTodo(data: Todo) {
        await updateTodo({
            ...todo,
            ...data,
        })
        setIsEditing(false)
    }

    async function onDeleteTodo() {
        // const todo = await
    }

    return (
        <div>
            {isEditing && (
                <TodoInput
                    todo={todo}
                    onDeleteTodo={onDeleteTodo}
                    onCloseTodo={onCloseTodo}
                    onUpdateTodo={onUpdateTodo}
                    form={formControl}
                />
            )}
            {!isEditing && (
                <div onClick={onTodoClick}>
                    <div className="flex items-end justify-between">
                        <span className="font-bold">{todo.name}</span>
                        <Chip label={todo.status} />
                    </div>
                    <p className="text-neutral-600">{todo.description}</p>
                    <p className="text-right text-sm text-neutral-600 italic">
                        {`Due Date: ${todo.dueDate ? dayjs(todo.dueDate).format('DD-MM-YYYY') : '-'}`}
                    </p>
                </div>
            )}
        </div>
    )
}

export default TodoRow
