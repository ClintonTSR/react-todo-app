import { Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Todo } from '../../queries/todo.type'
import MyTextField from '../inputs/MyTextField'
import { ControllerProps, useForm } from 'react-hook-form'

export type TodoInputProps = {
    todo?: Todo
    onUpdateTodo?: (data: Todo) => void
    onCreateTodo?: (data: Todo) => void
    onDeleteTodo: (data: Todo) => void
    onCloseTodo?: () => void
}

export default function TodoInput({
    todo,
    onDeleteTodo,
    onUpdateTodo,
    onCreateTodo,
    onCloseTodo,
}: TodoInputProps) {
    const { control, setValue, handleSubmit, formState } =
        useForm<Todo>()

    return (
        <div className="my-4 flex flex-col gap-4">
            <MyTextField<Todo>
                name="name"
                label="Name"
                defaultValue={todo?.name}
                control={control}
                required
            />
            <MyTextField<Todo>
                name="description"
                label="Description"
                defaultValue={todo?.description}
                control={control}
                minRows={3}
                multiline
                required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    format="DD-MM-YYYY"
                    label="Due Date"
                    defaultValue={todo?.dueDate && dayjs(todo.dueDate)}
                    onChange={(newValue) =>
                        setValue('dueDate', dayjs(newValue).toISOString())
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
                    onClick={onCloseTodo}
                >
                    Close
                </Button>

                {todo ? (
                    <Button
                        disabled={!formState.isDirty}
                        variant="contained"
                        color="warning"
                        onClick={handleSubmit(onUpdateTodo)}
                    >
                        Update
                    </Button>
                ) : (
                    <Button
                        disabled={!formState.isDirty}
                        variant="contained"
                        color="warning"
                        onClick={handleSubmit(onCreateTodo)}
                    >
                        Add
                    </Button>
                )}
            </div>
        </div>
    )
}
