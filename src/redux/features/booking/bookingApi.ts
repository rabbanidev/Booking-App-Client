import { IMeta } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";
import { IBooking } from "@/types/booking";

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

    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    getMyBookings: builder.query({
      query: (arg) => ({
        url: `${BOOKING_URL}/my-booking`,
        method: "GET",
      }),
      transformResponse: (response: { data: IBooking[] }, meta: IMeta) => {
        return {
          booking: response?.data,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCancelBookingMutation,
  useGetMyBookingsQuery,
} = bookingApi;
