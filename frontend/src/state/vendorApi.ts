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
  tagTypes: ["Vendor"],
  endpoints: (build) => ({
    addNew_vendor: build.mutation<Vendor_Data, vendr_form>({
      query: (data) => ({
        url: "/api/vendor/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    removeVendor: build.mutation({
      query: (data) => {
        return {
          url: `/api/vendor/remove/${data.id}`,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    getAllVendors: build.query<
      Vendors[],
      {
        keyword?: string;
        status?: string;
        rowsPerPage?: number;
        page?: number;
        is_active?: string;
      } | void
    >({
      query: (filters) => {
        // Initialize the query params object with the default value for isActive
        const params: Record<string, string | number | boolean> = {
          // is_active: filters.is_active, // Default to true
        };
        // Add filters to the query parameters if they are present
        if (filters) {
          if (filters.is_active) {
            params.is_active = filters.is_active;
          }
          if (filters.keyword) {
            params.keyword = filters.keyword;
          }
          if (filters.status && filters.status !== "all") {
            params.status = filters.status;
          }
          if (filters.rowsPerPage) {
            params.rowsPerPage = filters.rowsPerPage; // Convert number to string
          }
          if (filters.page) {
            params.page = filters.page; // Convert number to string
          }
        }

        return {
          url: "/api/vendor/all-vendors",
          params, // Use the dynamically constructed params
          method: "GET",
        };
      },

      providesTags: [{ type: "Vendor", id: "LIST" }],
    }),
  }),
});

// Export both the mutation and the query hooks
export const {
  useAddNew_vendorMutation,
  useGetAllVendorsQuery,
  useRemoveVendorMutation,
} = vendorApi;
