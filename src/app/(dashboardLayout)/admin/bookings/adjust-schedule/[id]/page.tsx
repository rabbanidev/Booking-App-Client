"use client";

import SubmitButton from "@/components/UI/button/SubmitButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import Form from "@/components/forms/Form";
import FormDatePicker from "@/components/forms/FormDatePicker";
import {
  useAdjustSchduleBookingMutation,
  useGetBookingQuery,
} from "@/redux/features/booking/bookingApi";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AdjustSchedule = ({ params }: { params: any }) => {
  const { data } = useGetBookingQuery(params.id);
  const router = useRouter();
  const [adjustSchduleBooking, { isLoading, isError, error, isSuccess }] =
    useAdjustSchduleBookingMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Schdule updated successfully!");
      router.push("/admin/bookings");
    }
  }, [isSuccess, router]);

  const submitHandler = (data: any) => {
    const payload = {
      checkIn: moment(data.checkIn).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      checkOut: moment(data.checkOut).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    };

    adjustSchduleBooking({ id: params.id, data: payload });
  };

  const defaultValues = {
    checkIn: data?.booking?.checkIn ? new Date(data?.booking?.checkIn) : "",
    checkOut: data?.booking?.checkOut ? new Date(data?.booking?.checkOut) : "",
  };

  return (
    <div>
      <Form submitHandler={submitHandler} defaultValues={defaultValues}>
        <div className="mt-2">
          <FormDatePicker
            name="checkIn"
            label="Check In Date"
            disabled={moment().toDate}
          />
        </div>
        <div className="mt-2">
          <FormDatePicker
            name="checkOut"
            label="Check Out Date"
            disabled={moment().toDate}
          />
        </div>

        <SubmitButton text="Adjust Schedule" loading={isLoading} />
        {isError && <ErrorMessage errorMessage={(error as any)?.message} />}
      </Form>
    </div>
  );
};

export default AdjustSchedule;
