import { useForm } from 'react-hook-form'
import { Todo } from '../../queries/todo.type'
import MyTextField from '../inputs/MyTextField'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Button, Chip } from '@mui/material'
import { useState } from 'react'

const TodoRow = ({ todo }: { todo: Todo }) => {
    const { control, setValue } = useForm<Todo>()
    const [isEditing, setIsEditing] = useState(false)

    function onTodoClick() {
        setIsEditing(true)
    }

    function onUpdateTodo() {

    }

    function onDeleteTodo() {

    }

    function onCreateTodo() {

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
                            label="Due Date"
                            value={todo.dueDate && dayjs(todo.dueDate)}
                            onChange={(newValue) =>
                                setValue('dueDate', dayjs(newValue).toDate())
                            }
                        />
                    </LocalizationProvider>
                    <div className='flex gap-4'>
                        <Button variant='outlined' onClick={onUpdateTodo}>Update</Button>
                        <Button variant='outlined' onClick={onDeleteTodo} color='error'>Delete</Button>
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
                    <span className="mr-2 text-sm text-neutral-600 italic">
                        Due Date:
                    </span>
                    {todo.dueDate ? todo.dueDate.toDateString?.() : '-'}
                </div>
            )}
        </div>
    )
}

export default TodoRow
