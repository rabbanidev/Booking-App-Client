import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const REVIEW_URL = "/reviews";

const reviewApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateReviewMutation } = reviewApi;
