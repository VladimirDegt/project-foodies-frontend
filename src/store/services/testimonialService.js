import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utilities/const.js";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "api/testimonials",
      providesTags: ["Testimonial"],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialApi;
