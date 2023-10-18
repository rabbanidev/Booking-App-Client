import * as yup from "yup";

export const createBookingSchema = yup.object().shape({
  checkIn: yup.date().required("Check in date is required!"),
  checkOut: yup.date().required("Check out date is required!"),
  totalPerson: yup.object().shape({
    label: yup.string().required("Total person is required!"),
    value: yup.number().min(1).required("Total person is required!"),
  }),
  customer: yup.object().shape({
    name: yup.string().required("Customer name is required!"),
    contactNo: yup.string().required("Contact number is required!"),
  }),
});
