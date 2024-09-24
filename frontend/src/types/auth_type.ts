export interface Login {
  email: string;
  password: string;
}
export interface Sign_up {
  email: string;
  name: string;
  uuid?:string;
  password: string;
}
export interface forgot_password {
  email: string;
}
export interface User_Data {
  token: string;
}
