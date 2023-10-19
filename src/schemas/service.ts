import * as yup from "yup";

export const serviceSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.string().required("Category is required!"),
  location: yup.string().required("Location is required!"),
  price: yup.number().min(1).positive().required("Price is required!"),
  maxSize: yup.number().min(1).positive().required("Max Size is required!"),
  description: yup.string().required("Description is required!"),
  image: yup.string().required("Image is required!"),
});
