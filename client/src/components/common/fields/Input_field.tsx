import { FormControl, InputLabel, MenuItem, Select, FormHelperText, OutlinedInput } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

// Updated SelectFieldProps with generics
interface SelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>; // Ensure name is a valid path in T
    label: string; // Label for the select field
}

const Input_field = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
}: SelectFieldProps<T>) => {
    // Type guard to ensure errors[name] is of type FieldError
    const errorMessage = errors[name] ? (errors[name] as { message?: string }).message : '';

    return (
        <Controller
        control={control}
            name={name}
            render={({ field }) => (
                <FormControl
                    sx={{ marginTop: "0px", width: '100%' }}
                    error={Boolean(errors.title)}
                >
                    <InputLabel sx={{ top: "-6px", fontSize: "13px" }}>
                       {label}
                    </InputLabel>
                    <OutlinedInput
                        inputProps={{
                            style: { padding: "10px", fontSize: "12px",borderRadius:'5px' },
                        }}
                        {...field}
                        label={label}
                    />
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

export default Input_field;
