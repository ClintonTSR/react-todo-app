import { Box, Button, Fab, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useGetTodosQuery } from '../queries/todo'
import InfiniteScroll from 'react-infinite-scroll-component'
import TodoRow from '../components/customs/TodoRow'
import { useState } from 'react'

const TodoListPage = () => {
    const navigate = useNavigate()
    const [showTodoInput, setShowTodoInput] = useState(true)

    const {
        data: todoRes,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        refetch,
    } = useGetTodosQuery({ limit: 30 })

    const flatTodos = todoRes?.pages.reduce(
        (acc, page) => [...acc, ...page.data],
        []
    )

    function onAddTodoClick() {
        setShowTodoInput(true)
    }
    return (
        <div className="mx-auto my-8 max-w-md min-w-[50vw] space-y-4">
            <Button className="float-end" onClick={onAddTodoClick} variant='contained'>Add New Todo</Button>
            <h1 className="text-4xl">My Todo List</h1>
            { <TodoRow />}
            <div className="h-[50vh] overflow-y-auto" id="todo-list">
                <InfiniteScroll
                    className="space-y-2 divide-y-2 divide-gray-200"
                    dataLength={flatTodos?.length ?? 0}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            - End of results -
                        </p>
                    }
                    refreshFunction={refetch}
                    scrollableTarget="todo-list"
                >
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Errored!</p>
                    ) : (
                        flatTodos.map((todo) => (
                            <TodoRow key={todo.id} todo={todo} />
                        ))
                    )}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default TodoListPage
