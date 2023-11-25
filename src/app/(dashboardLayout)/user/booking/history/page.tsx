"use client";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import CardLoading from "@/components/UI/loading/CardLoading";
import {
  useCancelBookingMutation,
  useGetMyBookingsQuery,
} from "@/redux/features/booking/bookingApi";
import Image from "next/image";

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
          const { name, price, image } = service;
          return (
            <div className="col-span-1" key={bookingId}>
              <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-md">
                {status === "accepted" ? (
                  <span className="bg-green-500 text-white px-3 py-1 absolute top-2 right-2 rounded text-xs">
                    {status}
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-3 py-1 absolute top-2 right-2 rounded text-xs">
                    {status}
                  </span>
                )}

                <Image
                  src={image}
                  alt={name}
                  width={200}
                  height={200}
                  className={`w-full h-full rounded--t-lg`}
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
