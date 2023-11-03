import { IBooking, IMeta } from "@/types";
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

    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    getMyBookings: builder.query({
      query: () => ({
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

    getBookings: builder.query({
      query: (arg) => ({
        url: `${BOOKING_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: { data: IBooking[] }, meta: IMeta) => {
        return {
          booking: response?.data,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),

    acceptBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/accept/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    rejectBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    adjustSchduleBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_URL}/adjust-schedule/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    getBooking: builder.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IBooking) => {
        return {
          booking: response,
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
  useGetBookingsQuery,
  useAcceptBookingMutation,
  useRejectBookingMutation,
  useAdjustSchduleBookingMutation,
  useGetBookingQuery,
} = bookingApi;
