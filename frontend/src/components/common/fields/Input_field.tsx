import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@nextui-org/react";
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
  const errorMessage = errors[name]
    ? (errors[name] as { message?: string }).message
    : "";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
          <Input
            {...field}
            type="text"
            aria-label={`input ${label}`}
            label={label}
            variant="bordered"
            isInvalid={!!errorMessage}  // Dynamically show invalid state based on errorMessage
            color={errorMessage ? "danger" : "default"}  // Change color based on error
            errorMessage={errorMessage || ""}  // Show error message if available
            fullWidth
          />
      )}
    />
  );
};

export default Input_field;
