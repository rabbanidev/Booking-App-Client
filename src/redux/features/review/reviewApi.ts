import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";
import { IMeta, IReview } from "@/types";

const REVIEW_URL = "/reviews";

const reviewApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (arg) => ({
        url: REVIEW_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: { data: IReview[] }, meta: IMeta) => {
        return {
          reviews: response?.data as IReview[],
          meta,
        };
      },
      providesTags: [tagTypes.review],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewApi;
