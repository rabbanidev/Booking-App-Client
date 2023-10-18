import { IMeta } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const BOOKING_URL = "/bookings";

const bookingApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking, tagTypes.cart],
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
