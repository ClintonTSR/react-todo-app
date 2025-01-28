import React from 'react';
import { Select, TextField, TextFieldProps, datepi } from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";

const MyTextField = <T,>({ name, control, ...props }: { name: Path<T>, control: Control<T> } & TextFieldProps ) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
               <TextField value={value} onChange={onChange}  {...props}/>
            )}
        />
    );
};

export default MyTextField;