import { z } from "zod";

export const vendor_schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name cannot be empty" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number can't be longer than 15 digits" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  company: z
    .string({ required_error: "Company name is required" })
    .min(1, { message: "Company name cannot be empty" }),
  gstin: z
    .string({ required_error: "GSTIN is required" })
    .length(15, { message: "GSTIN must be 15 characters long" }),
  address_line_1: z
    .string({ required_error: "Address Line 1 is required" })
    .min(1, { message: "Address Line 1 cannot be empty" }),
  address_line_2: z.string().optional(), // Optional field with no validation
  pin_code: z
    .string({ required_error: "Pin code is required" })
    .min(6, { message: "Pin code must be 6 digits" })
    .max(6, { message: "Pin code must be 6 digits" }),
  state: z
    .string({ required_error: "State is required" })
    .min(1, { message: "State cannot be empty" }),
  city: z
    .string({ required_error: "City is required" })
    .min(1, { message: "City cannot be empty" }),
  country: z
    .string({ required_error: "Country is required" })
    .min(1, { message: "Country cannot be empty" }),
//   debit: z
//     .string({ required_error: "Debit is required" })
//     .regex(/^\d+(\.\d{1,2})?$/, { message: "Debit must be a valid number" }), // Regex to validate a decimal number
//   credit: z
//     .string({ required_error: "Credit is required" })
//     .regex(/^\d+(\.\d{1,2})?$/, { message: "Credit must be a valid number" }),
//   linking_customer: z
//     .string({ required_error: "Linking customer is required" })
//     .min(1, { message: "Linking customer cannot be empty" }),
});
