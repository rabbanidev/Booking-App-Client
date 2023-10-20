"use client";

import { useEffect } from "react";
import { generateTotalPersonOptions } from "@/utils/optionGenerate";

import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/schemas/review";
import { useCreateReviewMutation } from "@/redux/features/review/review";
import toast from "react-hot-toast";
import Form from "@/components/forms/Form";
import SubmitButton from "@/components/UI/button/SubmitButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import FormInput from "@/components/forms/FormInput";
import FormPasswordInput from "@/components/forms/FormPasswordInput";
import { useCreateAdminMutation } from "@/redux/features/users/usersApi";
import { useRouter } from "next/navigation";
import { adminSchema } from "@/schemas/users";

const ReviewForm = () => {
  const router = useRouter();
  const [createAdmin, { isLoading, isError, error, isSuccess }] =
    useCreateAdminMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Admin successfully created!");
      router.push("/super_admin/users");
    }
  }, [isSuccess, router]);

  const submitHandler = (data: any) => {
    console.log(data);

    createAdmin(data);
  };

  return (
    <Form
      submitHandler={submitHandler}
      resolver={yupResolver(adminSchema)}
      isReset={isSuccess}
    >
      <div className="mt-2">
        <FormInput name="email" type="email" label="Email" />
      </div>
      <div className="mt-2">
        <FormPasswordInput name="password" label="Password" />
      </div>
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 my-2">
        <FormInput name="admin.name.firstName" type="text" label="First Name" />
        <FormInput name="admin.name.lastName" type="text" label="Last Name" />
      </div>
      <FormInput name="admin.contactNo" type="text" label="Contact No" />

      <SubmitButton text="Create Admin" loading={isLoading} />
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
