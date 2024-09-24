import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
interface SelectFieldProps {
  label: string; // Label for the select field
  options: { value: string; label: string }[]; // Options for the select field
  get_value: (value: string | number) => void;
}

const Select_normal: React.FC<SelectFieldProps> = ({ label, options, get_value }) => {
  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    get_value(selectedValue); // Pass the selected value to the parent component
  };
  return (
    <Select label={label} variant="bordered" className="w-full"
    aria-label={`input ${label}`}
      onChange={(e) => handleSelectionChange(e)}// 
    >
      {options.map((animal, i) => (
        <SelectItem key={animal.label} value={animal.label}>{animal.label}</SelectItem>
      ))}
    </Select>
  );
};

export default Select_normal;
