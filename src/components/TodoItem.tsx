import React, { Fragment, useEffect } from 'react';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import MySelect, { SelectItemType } from "./inputs/MySelect";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { deleteTodoMutationDoc, updateTodoMutationDoc } from "../queries/todo-list";
import { DeleteTodoMutationVariables, UpdateTodoMutationVariables } from "../gql/graphql";
import { gqlClient, queryClient } from "../main";
import MyTextField from "./inputs/MyTextField";
import { DeleteOutline } from "@mui/icons-material";

export type TodoItemProps = {
    id: string;
    listId: string;
    name: string;
    description?: string;
    dueDate?: Date;
    status: number;
}
const TodoItem = ({ id, listId, name, description, dueDate, status }: TodoItemProps) => {
    const { control, watch, getValues , reset } = useForm({
        defaultValues: {
            name,
            description,
            dueDate,
            status,
        }
    });

    useEffect(() => {
        reset({ name, description, dueDate, status })
    }, [name, description, dueDate, status]);

    const { mutate: updateMutate, } = useMutation({
        mutationFn: async (variables: UpdateTodoMutationVariables) => {
            return gqlClient.request(
                updateTodoMutationDoc,
                variables)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['list#' + listId] })
        }
    })

    useEffect(() => {
        updateMutate({
            id,
            listId,
            ...getValues()
        });
    }, [watch('status')])

    const statusOptions: SelectItemType[] = [
        { label: 'Not Started', value: 1 },
        { label: 'In Progress', value: 2 },
        { label: 'Completed', value: 3 },
    ]

    const { mutate: deleteMutate, } = useMutation({
        mutationFn: async (variables: DeleteTodoMutationVariables) => {
            return gqlClient.request(
                deleteTodoMutationDoc,
                variables)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list#' + listId] })
        }
    })

    function deleteTodo() {
        deleteMutate({ id, listId });
    }

    const trackedStatus = getValues('status');

    return (
        <Box>
            {
                !name ?
                    <MyTextField name={'name'} control={control}/> :
                    <Stack direction="row" gap={2} justifyContent={'space-between'} alignContent={'center'}
                           alignItems={'center'}>
                        {/*<Typography>{description}</Typography>*/}
                        {/*<Typography>{dueDate?.toLocaleDateString()}</Typography>*/}
                        <Typography>{name}</Typography>
                        <Stack direction="row" gap={1}>
                            <IconButton color="error" onClick={deleteTodo}>
                                <DeleteOutline/>
                            </IconButton>
                            <MySelect control={control} name="status" options={statusOptions}
                                      size={'small'}
                                      sx={{
                                          minWidth: '150px',
                                          maxWidth: '150px',
                                          color: '#222',
                                          backgroundColor:
                                              trackedStatus === 1 ? '#eaeaea' :
                                                  trackedStatus === 2 ? '#ffeea0' : '#b6ffae',
                                      }}/>
                        </Stack>
                    </Stack>
            }

        </Box>
    );
};

export default TodoItem;