import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const FEEDBACK_URL = "/feedbacks";

const feedbackAPi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackAPi;
