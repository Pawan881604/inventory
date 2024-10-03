import cookiesManager from "@/lib/service/cookies-axis/Cookies";
import { categorie_form } from "@/types/categorie_type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure /react is imported

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const categorieApi = createApi({
  reducerPath: "categorieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = cookiesManager.get("auth_token"); // Get token from cookies
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addNewCategorie: builder.mutation<any, categorie_form>({
      query: (data) =>{
        const formData = new FormData();
          console.log(data)
        // Add files to formData
        if (data.images) {
          data.images.forEach((file:any) => formData.append("images", file)); // Assuming 'images' is an array of files
        }

        // Append other data fields
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("uuid", data.uuid);
        formData.append("status", data.status);

        return {
          url: "/categorie/add",
          method: "POST",
          body: formData, // Use formData as body
        };
      }
    }),
  }),
});

// Correct hook name generated by createApi
export const { useAddNewCategorieMutation } = categorieApi;
