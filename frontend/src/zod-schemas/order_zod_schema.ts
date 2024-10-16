import { z } from "zod";

export const order_type_form_schema = z.object({
  order_status: z.string().nonempty("Order status is required"),
  customer: z.string().nonempty("Customer is required"),
  dispatch_mod: z.string().nonempty("Dispatch mode is required"),
  invoice_no: z.string().optional(),
  shipping_address: z.object({
    address_line_1: z.string().nonempty("Address line 1 is required"),
    address_line_2: z.string().optional(),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    pin_code: z.string().nonempty("Pin code is required"), // Use z.string() for string type
    country: z.string().nonempty("Country is required"),
  }),
  payment_mode: z.string().nonempty("Payment mode is required"),
  status: z.string().optional(),
  name: z.string().nonempty("Name is required"),
  Company: z.string().nonempty("Company is required").optional(),
  email: z.string().email("Invalid email format"),
  phone: z.string().nonempty("Phone is required"),
  gstin: z.string().optional(),
});
