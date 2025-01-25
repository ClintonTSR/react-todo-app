// import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import TodoItem from "../components/TodoItem";
// import React, { Fragment, useEffect, useState } from "react";
// import MyTextField from "../components/inputs/MyTextField";
// import { useForm } from "react-hook-form";
// import { ArrowLeftRounded } from "@mui/icons-material";
// import { getTodoById, getTodos } from "../queries/todo";

// const TodoPage = () => {
//     const { todoId } = useParams();
//     const [todos, setTodos] = useState([]);
//     const { data: todo } = getTodoById(todoId);

//     const { control, watch, getValues, resetField } = useForm({
//         defaultValues: {
//             newTodoName: "",
//         }
//     });

//     const { mutate } = useMutation({
//         // mutationFn
//     })

//     function appendNewTodo(event: React.KeyboardEvent<HTMLDivElement>) {
//         // if (event.code === 'Enter') {
//         //     mutate({ todoId: getValues('newTodoName') })
//         // }
//     }

//     useEffect(() => {
//         if (!data) return;
//         setTodos(data.todoList.todos)
//     }, [data]);

//     const updateTodo = (updatedTodo) => {
//         setTodos((prevTodos) => {
//             const newTodos = [...prevTodos];
//             const index = newTodos.findIndex((todo) => todo.id === updatedTodo.id);
//             if (index !== -1) {
//                 newTodos[index] = updatedTodo;
//             }
//             return newTodos;
//         });
//     };

//     return (
//         <Stack rowGap={1} paddingY={2}>
//             <Stack direction={'row'} columnGap={2}>
//                 <IconButton component={Link} to={'/lists'}>
//                     <ArrowLeftRounded fontSize={'large'}/>
//                 </IconButton>
//                 <Typography variant={'h4'} fontWeight={'bold'}>{data?.todoList.name}</Typography>
//             </Stack>
//             {
//                 todos.map(({ id, status }) =>
//                     <Typography key={id}>{status}</Typography>
//                 )
//             }
//             {
//                 todos.map(({ id, ...rest }) =>
//                     <Fragment key={id}>
//                         <TodoItem id={id} todoId} {...rest}/>
//                         <Divider/>
//                     </Fragment>)
//             }
//             <MyTextField name={'newTodoName'} control={control} onKeyDown={appendNewTodo} variant={'standard'}
//                          placeholder={'New todo ...'} sx={{ marginTop: '8px' }}/>
//         </Stack>
//     );
// };

// export default TodoPage;