import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  rating: yup.object().shape({
    label: yup.string().required("Rating is required!"),
    value: yup.number().required("Rating is required!"),
  }),
  description: yup.string().required("Description is required!"),
});
