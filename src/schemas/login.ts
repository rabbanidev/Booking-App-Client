import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email is invalid!").required("Email is required!"),
  password: yup.string().min(4).max(8).required("Password is required!"),
});
