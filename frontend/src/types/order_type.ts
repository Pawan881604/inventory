export interface BaseAddress {
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pin_code: number;
  country: string;
}

export interface order_type_form {
  order_date?: string;
  order_status?: string;
  customer?: number;
  billing_address?: BaseAddress;
  shipping_address?: BaseAddress;
  payment_mode?:string;
  shipping_mode?:string;
}
