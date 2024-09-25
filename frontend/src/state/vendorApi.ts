import { Vendor_Data, vendr_form } from "@/types/Vendor_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Vendors {
  name: string;
  phone: string;
  email: string;
  // Add other fields as needed
}

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000/" }),
  endpoints: (build) => ({
    addNew_vendor: build.mutation<Vendor_Data, vendr_form>({
      query: (data) => ({
        url: "/api/vendor/add",
        method: "POST",
        body: data,
      }),
    }),
    getAllVendors: build.query<Vendors[], string | void>({
      query: (search) => ({
        url: "/api/vendor/all-vendors",
        params: search ? { search } : {},
        method: "GET",
      }),
    }),
  }),
});

// Export both the mutation and the query hooks
export const { useAddNew_vendorMutation, useGetAllVendorsQuery } = vendorApi;
