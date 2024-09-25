import { Vendor_Data, vendr_form } from "@/types/Vendor_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useAddNew_vendorMutation } = vendorApi;
