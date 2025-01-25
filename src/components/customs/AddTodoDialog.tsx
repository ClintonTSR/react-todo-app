import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { bindMenu } from "material-ui-popup-state";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {  queryClient } from "../../main";
import MyTextField from "../inputs/MyTextField";

type FormInput = {
    listName: string,
}

const AddTodoDialog = ({ popupState }) => {
    const { control, handleSubmit } = useForm<FormInput>({
        defaultValues: {
            listName: "",
        }
    });

    // const { mutateAsync } = useMutation({
    //     mutationFn: async (variables: ) => {
    //         return 
    //     },
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({ queryKey: ['lists'] })
    //     }
    // })

    async function onSubmit({ listName }: FormInput) {
        // await mutateAsync({ listName });
        popupState.close();
    }

    return (
        <Dialog  {...bindMenu(popupState)} sx={{ padding: 2 }}>
            <DialogTitle>Add Todo List</DialogTitle>
            <DialogContent>
                <MyTextField<FormInput> name={"listName"} control={control} label={"name"}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onSubmit)}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTodoDialog;