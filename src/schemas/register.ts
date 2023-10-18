import * as yup from "yup";

export const registerSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.object().shape({
      firstName: yup.string().required("First name is required!"),
      lastName: yup.string().required("Last name is required!"),
    }),
    contactNo: yup.string().required("Contact No is required!"),
  }),
  email: yup.string().email("Email is invalid!").required("Email is required!"),
  password: yup.string().min(4).max(8).required("Password is required!"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    //@ts-ignore
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
