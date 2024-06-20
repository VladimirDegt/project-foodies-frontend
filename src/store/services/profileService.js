import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utilities/const.js";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers, { getState }) {
      const token = getState().auth.token;
      headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (userId) => `api/users/details/${userId}`,
      providesTags: ["Profile"],
    }),
    fetchCurrentUserProfile: builder.query({
      query: () => `api/users/current`,
      providesTags: ["Profile"],
    }),
    fetchUserFollowers: builder.query({
      query: ({ userId, page = 1, limit = 10 }) =>
        `api/users/followers/${userId}?page=${page}&limit=${limit}`,
      providesTags: ["Profile"],
    }),
    fetchUserFollowing: builder.query({
      query: ({ page = 1, limit = 10 }) => `api/users/following?page=${page}&limit=${limit}`,
      providesTags: ["Profile"],
    }),
    fetchUserRecipes: builder.query({
      query: ({ userId, page = 1, limit = 10 }) =>
        `api/recipes/myrecipes/${userId}?page=${page}&limit=${limit}`,
      providesTags: ["Profile"],
    }),
    fetchUserFavoritesRecipes: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/api/recipes/myrecipes/favorites?page=${page}&limit=${limit}`,
      providesTags: ["Profile"],
    }),
    updateUserAvatar: builder.mutation({
      query: (formData) => ({
        url: "api/users/avatars",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
    followUser: builder.mutation({
      query: (userId) => ({
        url: `api/users/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `api/users/unfollow/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useFetchUserProfileQuery,
  useFetchCurrentUserProfileQuery,
  useFetchUserFollowersQuery,
  useFetchUserFollowingQuery,
  useUpdateUserAvatarMutation,
  useFetchUserRecipesQuery,
  useFetchUserFavoritesRecipesQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = profileApi;
