import { Login, Sign_up, User_Data } from "@/types/auth_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000/" }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    loginUser: build.mutation<User_Data, Login>({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    sign_up_user: build.mutation<User_Data, Sign_up>({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSign_up_userMutation } = usersApi;
