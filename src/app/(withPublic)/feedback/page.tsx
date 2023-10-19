"use client";

import SubmitButton from "@/components/UI/button/SubmitButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { useCreateFeedbackMutation } from "@/redux/features/feedback/feedbackAPi";
import { feefbackSchema } from "@/schemas/feedback";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  description: string;
};

const FeedBackPage = () => {
  const [createFeedback, { isLoading, isError, error, isSuccess }] =
    useCreateFeedbackMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Feedback successfully send.");
    }
  }, [isSuccess]);

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    createFeedback(data);
  };

  return (
    <section className="mt-10">
      <div className="container">
        <Form
          submitHandler={submitHandler}
          resolver={yupResolver(feefbackSchema)}
          isReset={isSuccess}
        >
          <p className="text-2xl font-semibold">Feedback</p>
          <div className="mt-2">
            <FormInput name="name" type="text" label="Full Name" />
          </div>
          <div className="mt-2">
            <FormInput name="email" type="email" label="Email" />
          </div>
          <div className="mt-2">
            <FormTextArea name="description" label="Description" />
          </div>

          <SubmitButton text="Send Feedback" loading={isLoading} />
          {isError && (
            <ErrorMessage
              errorMessage={(error as any)?.message}
              errorMessages={(error as any).errorMessages}
            />
          )}
        </Form>
      </div>
    </section>
  );
};

export default FeedBackPage;
