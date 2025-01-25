import React, { Fragment } from 'react';
import { InputLabel, MenuItem, Select, SelectProps, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";

export type SelectItemType = {
    label: string;
    value: string | number;
}
const MySelect = <T, >({ name, control, options, onChange, value, ...props }: (
        {
            name: Path<T>,
            control: Control<T>
            options: SelectItemType[]
        } & SelectProps )
    ) => {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Fragment>
                        <Select value={value} onChange={onChange}  {...props}>
                            {
                                options.map(({ label, value }, index) =>
                                    <MenuItem key={index} value={value}>
                                        {label}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </Fragment>
                )}
            />
        );
    }
;

export default MySelect;