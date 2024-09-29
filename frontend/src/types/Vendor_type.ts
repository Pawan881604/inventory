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
  vendor_name: string;
  phone: string;
  email: string;
  company: string;
  gstin: string;
  address_line_1: string;
  address_line_2: string;
  pin_code: string;
  state: string;
  status:string;
  city: string;
  country: string;
  is_active:string;
  is_delete:string;
  linking_customer: string;
  resultPerpage: number;
  data_counter: number;
}

export interface Vendor_Data {
  token: string;
}

export interface Get_VendorResponse {
  vendor: vendr_list[]; // Make sure this matches your expected type
  resultPerpage: number; // Add any other properties you expect
  data_counter: number; // Add any other properties you expect
}

export interface vendor_Column {
  name: string;
  uid: string;
}