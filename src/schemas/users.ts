import * as yup from "yup";

export const adminSchema = yup.object().shape({
  email: yup.string().email("Email is invalid!").required("Email is required!"),
  password: yup.string().min(4).max(8).required("Password is required!"),
  admin: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First name is required!"),
      lastName: yup.string().required("Last name is required!"),
    }),
    contactNo: yup.string().required("Contact No is required!"),
  }),
});
