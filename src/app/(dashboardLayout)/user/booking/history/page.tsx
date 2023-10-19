/* eslint-disable @next/next/no-img-element */
"use client";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import CardLoading from "@/components/UI/loading/CardLoading";
import {
  useCancelBookingMutation,
  useGetMyBookingsQuery,
} from "@/redux/features/booking/bookingApi";

const BookingHistory = () => {
  const { isLoading, isError, error, data } = useGetMyBookingsQuery(undefined);
  const [cancelBooking] = useCancelBookingMutation();

  const cancelBookingHandler = (id: string) => {
    cancelBooking(id);
  };

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </div>
    );
  } else if (!isLoading && isError) {
    content = <ErrorMessage errorMessage={(error as any).message} />;
  } else if (!isLoading && !isError && data?.booking?.length === 0) {
    content = <ErrorMessage errorMessage="There is no booking history!" />;
  } else {
    content = (
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.booking.map((booking) => {
          const { id: bookingId, service, status } = booking;
          const { name, price } = service;
          return (
            <div className="col-span-1" key={bookingId}>
              <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md">
                <span className="bg-red-500 text-white px-3 py-1 absolute top-2 right-2 rounded text-xs">
                  {status}
                </span>
                <img
                  className="w-full h-60 rounded-t-lg object-cover"
                  src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt="product image"
                />
                <div className="mt-4 px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-slate-900 truncate">
                    {name}
                  </h5>
                  <p className="text-sm font-bold text-slate-900">
                    BDT {price}
                    <span className="text-gray-700 text-xs font-normal">
                      /person
                    </span>
                  </p>
                  {status !== "cancelled" && (
                    <button
                      type="button"
                      className="mt-3 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1"
                      onClick={() => cancelBookingHandler(bookingId)}
                    >
                      Booking Cancelled
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-xl font-medium text-black">
        Booking / Service History
      </h5>
      {content}
    </div>
  );
};

export default BookingHistory;
