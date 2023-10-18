"use client";

import moment from "moment";
import Form from "../forms/Form";
import FormDatePicker from "../forms/FormDatePicker";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBookingSchema } from "@/schemas/booking";
import { SubmitHandler } from "react-hook-form";
import { useGetMyInfoQuery } from "@/redux/features/users/usersApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ErrorMessage from "../UI/error/ErrorMessage";

type IProps = {
  serviceId: string;
  totalPersonOptions: {
    value: number;
    label: string;
  }[];
};

type FormValues = {
  checkIn: Date;
  checkOut: Date;
  totalPerson: number;
  service: string;
  customer: {
    name: string;
    contactNo: string;
  };
};

const BookingForm = ({ serviceId, totalPersonOptions }: IProps) => {
  const { data } = useGetMyInfoQuery(undefined);
  const [
    createBooking,
    { isLoading, isError, error, isSuccess, data: bookingData },
  ] = useCreateBookingMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Booking successfully added!");
    }
  }, [isSuccess]);

  // Destructures from user
  const { name, contactNo, active: isActiveUser } = data?.user?.user || {};
  const defaultValues = {
    checkIn: new Date(),
    checkOut: new Date(),
    customer: {
      name: name ? `${name?.firstName} ${name?.lastName}` : "",
      contactNo: contactNo ? contactNo : "",
    },
  };

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    if (!isActiveUser) {
      toast.error("Your are not active user!");
    } else {
      const payload = {
        ...data,
        service: serviceId,
        totalPerson: data.totalPerson.value,
        checkIn: moment(data.checkIn).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        checkOut: moment(data.checkOut).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      };

      createBooking(payload);
    }
  };

  return (
    <div className="mt-5 p-5 rounded-xl w-full shadow">
      <Form
        submitHandler={submitHandler}
        defaultValues={defaultValues}
        resolver={yupResolver(createBookingSchema)}
        isReset={isSuccess}
      >
        <p className="texcheckInt-lg font-medium">Information</p>
        <div className="mt-2">
          <FormInput name="customer.name" type="text" label="Full Name" />
        </div>
        <div className="mt-1">
          <FormInput name="customer.contactNo" type="text" label="Contact No" />
        </div>

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
        <div className="mt-2">
          <FormSelect
            name="totalPerson"
            label="Total Person"
            options={totalPersonOptions}
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Book Now"}
        </button>
        {isError && (
          <ErrorMessage
            errorMessage={(error as any)?.message}
            errorMessages={(error as any).errorMessages}
          />
        )}
      </Form>
    </div>
  );
};

export default BookingForm;
