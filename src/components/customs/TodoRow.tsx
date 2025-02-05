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

const TodoRow = ({ todo }: { todo: Todo }) => {
    const { control, setValue, handleSubmit, formState, getValues } = useForm<Todo>()
    const [isEditing, setIsEditing] = useState(false)
    const { mutateAsync: updateTodo } = useUpdateTodoMutation()
    const { mutateAsync: createTodo } = useCreateTodoMutation()

    function onTodoClick() {
        setIsEditing(true)
    }

    function closeTodo() {
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

    async function onCreateTodo(todo: Todo) {
        await createTodo(todo)
        setIsEditing(false)
    }

    return (
        <div>
            {isEditing && (
                <div className="my-4 flex flex-col gap-4">
                    <MyTextField<Todo>
                        name="name"
                        label="Name"
                        defaultValue={todo.name}
                        control={control}
                    />
                    <MyTextField<Todo>
                        name="description"
                        label="Description"
                        defaultValue={todo.description}
                        control={control}
                        multiline
                        minRows={3}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD-MM-YYYY"
                            label="Due Date"
                            defaultValue={todo.dueDate && dayjs(todo.dueDate)}
                            onChange={(newValue) =>
                                setValue(
                                    'dueDate',
                                    dayjs(newValue).toISOString()
                                )
                            }
                        />
                    </LocalizationProvider>
                    <div className="flex gap-4">
                        <Button
                            variant="outlined"
                            onClick={handleSubmit(onDeleteTodo)}
                            color="error"
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            className="justify-self-end"
                            onClick={closeTodo}
                        >
                            Close
                        </Button>
                        <Button
                            disabled={!formState.isDirty}
                            variant="contained"
                            color="warning"
                            onClick={handleSubmit(onUpdateTodo)}
                        >
                            Update
                        </Button>
                    </div>
                </div>
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
