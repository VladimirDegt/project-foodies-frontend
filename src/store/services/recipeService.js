import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utilities/const.js";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers, { getState }) {
      const token = getState().auth.token;
      headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: ({ category, ingredients, area, limit, page } = {}) => {
        const params = new URLSearchParams();
        if (category) {
          params.append("category", category);
        }
        if (ingredients) {
          params.append("ingredients", ingredients);
        }
        if (area) {
          params.append("area", area);
        }
        if (limit) {
          params.append("limit", limit);
        }
        if (page) {
          params.append("page", page);
        }
        return `api/recipes/?${params.toString()}`;
      },
      providesTags: ["Recipe"],
    }),
    getRecipyById: builder.query({
      query: (id) => `api/recipes/${id}`,
      providesTags: ["Recipe"],
    }),
    getPopularRecipe: builder.query({
      query: () => "api/recipes/favorites",
      providesTags: ["Recipe"],
    }),
    getFavoriteRecipes: builder.query({
      query: ({ page, limit } = {}) => {
        const params = new URLSearchParams();
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return `api/recipes/myrecipes/favorites?${params.toString()}`;
      },
      providesTags: ["Recipe"],
    }),
    addFavoriteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: "api/recipes/favorites",
        method: "POST",
        body: { recipe: recipeId },
      }),
      invalidatesTags: ["Recipe"],
    }),
    removeFavoriteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: "api/recipes/favorites",
        method: "DELETE",
        body: { recipe: recipeId },
      }),
      invalidatesTags: ["Recipe"],
    }),
    removeRecipe: builder.mutation({
      query: (id) => ({
        url: `api/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
    createRecipe: builder.mutation({
      query: (newRecipe) => ({
        url: "api/recipes",
        method: "POST",
        body: newRecipe,
        invalidatesTags: ["Recipe"],
      }),
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipyByIdQuery,
  useGetPopularRecipeQuery,
  useGetFavoriteRecipesQuery,
  useAddFavoriteRecipeMutation,
  useRemoveFavoriteRecipeMutation,
  useRemoveRecipeMutation,
  useCreateRecipeMutation,
} = recipeApi;
