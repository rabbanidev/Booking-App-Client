"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../forms/Form";
import FormInput from "../forms/FormInput";
import FormPasswordInput from "../forms/FormPasswordInput";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import ErrorMessage from "../UI/error/ErrorMessage";
import { registerSchema } from "@/schemas/register";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  user: {
    name: {
      firstName: string;
      lastName: string;
    };
    contactNo: string;
  };
};

const RegisterForm = () => {
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    console.log(data);

    register(data);
  };

  return (
    <Form
      submitHandler={submitHandler}
      resolver={yupResolver(registerSchema)}
      isReset={isSuccess}
    >
      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormInput
          name="user.name.firstName"
          type="text"
          placeholder="Jhon"
          label="First Name"
        />
        <FormInput
          name="user.name.lastName"
          type="text"
          placeholder="Dhoe"
          label="Last Name"
        />
      </div>
      <div className="mb-3">
        <FormInput
          name="email"
          type="email"
          placeholder="example@gmail.com"
          label="Email"
        />
      </div>
      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormPasswordInput
          name="password"
          placeholder="••••••••"
          label="Password"
        />
        <FormPasswordInput
          name="confirmPassword"
          placeholder="••••••••"
          label="Confirm Password"
        />
      </div>
      <div className="mb-3">
        <FormInput
          name="user.contactNo"
          type="text"
          placeholder="+880170000000"
          label="Contact No"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : " Sign up"}
      </button>
      {isError && <ErrorMessage errorMessage={(error as any).message} />}
      <p className="mt-3 text-sm font-light">
        Already have an account?
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
