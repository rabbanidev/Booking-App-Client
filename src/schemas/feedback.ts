import * as yup from "yup";

export const feefbackSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().required("EMail is required!").email("Invalid email"),
  description: yup.string().required("Description is required!"),
});
