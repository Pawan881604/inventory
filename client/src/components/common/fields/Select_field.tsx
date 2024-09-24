import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>; // Ensure name is a valid path in T
    label: string; // Label for the select field
    options: { value: string; label: string }[]; // Options for the select field
}

const Select_field = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
    options,
}: SelectFieldProps<T>) => {
    const errorMessage = errors[name] ? (errors[name] as { message?: string }).message : '';
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormControl
                    sx={{ marginTop: "0px", width: '100%' }}
                    error={Boolean(errorMessage)}
                >
                    <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                        {label}
                    </InputLabel>
                    <Select
                        {...field}
                        label={label}
                        value={field.value ?? ''} // Ensure value is always controlled
                        sx={{
                            ".MuiSelect-select": {
                                padding: "8px 10px",
                                fontSize: "12px",
                                borderRadius:'5px'
                            },
                        }}
                    >
                        {options.map(option => (
                            <MenuItem key={option.value} value={option.value} sx={{ fontSize: "12px" }}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errorMessage && (
                        <FormHelperText>
                            {errorMessage}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default Select_field;
