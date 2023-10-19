"use client";

import SubmitButton from "../UI/button/SubmitButton";
import Form from "../forms/Form";
import FormTextArea from "../forms/FormTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../UI/error/ErrorMessage";
import FormInput from "../forms/FormInput";
import FileUpload from "../UI/FileUpload";

type IProps = {
  btnText: string;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  schema?: any;
  defaultValues?: Record<string, any>;
};

const ServiceForm = ({
  btnText,
  onSubmit,
  isLoading,
  isSuccess,
  schema,
  defaultValues,
}: IProps) => {
  const submitHandler = (data: any) => {
    onSubmit(data);
  };

  return (
    <Form
      submitHandler={submitHandler}
      resolver={yupResolver(schema)}
      isReset={isSuccess}
      defaultValues={defaultValues}
    >
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FormInput name="name" type="text" label="Name" />
        <FormInput name="category" type="text" label="Category" />
        <FormInput name="location" type="text" label="Location" />
        <FormInput name="price" type="text" label="Price" />
        <FormInput name="maxSize" type="text" label="maxSize" />
      </div>
      <div className="mt-5">
        <FormTextArea name="description" label="Description" />
      </div>
      <div className="mt-5">
        <FileUpload name="image" />
      </div>

      <SubmitButton text={btnText} loading={isLoading} />
    </Form>
  );
};

export default ServiceForm;
