"use client";

import { useEffect } from "react";
import { generateTotalPersonOptions } from "@/utils/optionGenerate";
import SubmitButton from "../UI/button/SubmitButton";
import Form from "../forms/Form";
import FormSelect from "../forms/FormSelect";
import { SubmitHandler } from "react-hook-form";
import FormTextArea from "../forms/FormTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/schemas/review";
import { useCreateReviewMutation } from "@/redux/features/review/review";
import ErrorMessage from "../UI/error/ErrorMessage";
import toast from "react-hot-toast";

type FormValues = {
  rating: {
    label: string;
    value: number;
  };
  description: string;
};

const ReviewForm = ({ serviceId }: { serviceId: string }) => {
  const [createReview, { isLoading, isError, error, isSuccess }] =
    useCreateReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Thanks for supporting us.");
    }
  }, [isSuccess]);

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    const payload = { ...data, service: serviceId, rating: data.rating.value };
    createReview(payload);
  };

  return (
    <Form
      submitHandler={submitHandler}
      resolver={yupResolver(reviewSchema)}
      isReset={isSuccess}
    >
      <p className="text-2xl font-semibold">Review</p>
      <div className="mt-2">
        <FormSelect
          name="rating"
          label="Rating"
          options={generateTotalPersonOptions(5)}
        />
      </div>
      <div className="mt-2">
        <FormTextArea name="description" label="Description" />
      </div>

      <SubmitButton text="Create Review" loading={isLoading} />
      {isError && (
        <ErrorMessage
          errorMessage={(error as any)?.message}
          errorMessages={(error as any).errorMessages}
        />
      )}
    </Form>
  );
};

export default ReviewForm;
