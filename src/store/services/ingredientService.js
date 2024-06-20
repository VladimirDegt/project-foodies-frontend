import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utilities/const";

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => "api/ingredients",
      providesTags: ["Ingredients"],
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientApi;
