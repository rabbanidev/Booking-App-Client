"use client";

import Pagination from "@/components/UI/Pagination";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import TableLoader from "@/components/UI/loading/TableLoader";
import Select from "@/components/forms/Select";
import ActionBar from "@/components/shared/ActionBar";
import { commonSorting, paginationLimits } from "@/constants/pagination";
import {
  useAcceptBookingMutation,
  useGetBookingsQuery,
  useRejectBookingMutation,
} from "@/redux/features/booking/bookingApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookingPage = () => {
  const query: Record<string, any> = {};
  const [sorting, setSorting] = useState<any>(commonSorting[1]);
  const [limit, setLimit] = useState<any>(paginationLimits[1]);
  const [page, setPage] = useState<number>(0);

  query["page"] = page;
  query["limit"] = limit.value;
  query["sortOrder"] = sorting.sortOrder;
  query["sortBy"] = sorting.sortBy;

  const { isLoading, isError, error, data } = useGetBookingsQuery(query);
  const [acceptBooking, { error: acceptError }] = useAcceptBookingMutation();
  const [rejectBooking, { error: rejectError }] = useRejectBookingMutation();

  const acceptedHandler = (id: string) => {
    acceptBooking(id);
  };
  const rejectedHandler = (id: string) => {
    rejectBooking(id);
  };

  useEffect(() => {
    if (acceptError || rejectError) {
      const message =
        (rejectError as any).message || (acceptError as any).message;
      toast.error(message);
    }
  }, [acceptError, rejectError]);

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = <TableLoader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage errorMessage={(error as any).message} />;
  } else if (!isLoading && !isError && data?.booking?.length === 0) {
    content = <ErrorMessage errorMessage="There is no booking available" />;
  } else {
    content = (
      <div className="mt-5 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Service Name</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Service Price</th>
                <th className="px-4 py-3">Total Person</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.booking?.map((book) => (
                <tr className="text-gray-700" key={book.id}>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {book.service.name}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {book.customer.name}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {book.user.user?.name?.firstName}{" "}
                    {book.user?.user.name?.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    BDT{book.service.price}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {book.totalPerson}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {book.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border flex gap-x-3">
                    <button
                      className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-2 py-2"
                      onClick={() => acceptedHandler(book.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2"
                      onClick={() => rejectedHandler(book.id)}
                    >
                      Reject
                    </button>
                    <Link
                      href={`/admin/bookings/adjust-schedule/${book.id}`}
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2"
                    >
                      Adjust
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ActionBar text="Bookings List" />
      <div className="mt-5 flex flex-col gap-2 md:flex-row md:justify-between">
        <div className="w-full flex gap-2 md:justify-end">
          <Select
            options={commonSorting}
            selectedOption={sorting}
            changeHandler={(option: any) => setSorting(option)}
            placeholder="Sort Order"
          />
          <Select
            options={paginationLimits}
            selectedOption={limit}
            changeHandler={(option: any) => setLimit(option)}
          />
        </div>
      </div>
      {content}
      {data?.meta && data?.booking.length > 0 && (
        <div className="mt-2 flex justify-end lg:mt-10">
          <Pagination
            limit={Number(data.meta.limit)}
            total={Number(data.meta.total)}
            handlePagination={(value) => setPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default BookingPage;
