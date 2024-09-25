export interface vendr_form {
  name: string;
  phone: string;
  email: string;
  company: string;
  gstin: string;
  address_line_1: string;
  address_line_2: string;
  pin_code: string;
  state: string;
  city: string;
  country: string;
  debit: string;
  credit: string;
  linking_customer: string;
}

export interface vendr_list {
  _id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  gstin: string;
  address_line_1: string;
  address_line_2: string;
  pin_code: string;
  state: string;
  city: string;
  country: string;
  linking_customer: string;
}

export interface Vendor_Data {
  token: string;
}
