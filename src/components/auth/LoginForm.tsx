"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../forms/Form";
import { loginSchema } from "@/schemas/login";
import FormInput from "../forms/FormInput";
import FormPasswordInput from "../forms/FormPasswordInput";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import ErrorMessage from "../UI/error/ErrorMessage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/app/hooks";
import { getUserInfo } from "@/services/auth.service";
import { ENUMS_USER_ROLE } from "@/constants/role";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const userInfo: any = accessToken && getUserInfo(accessToken as string);

  useEffect(() => {
    if (userInfo?.role === ENUMS_USER_ROLE.ADMIN) {
      router.push(`/${userInfo.role}/profile`);
    } else if (userInfo?.role === ENUMS_USER_ROLE.SUPER_ADMIN) {
      router.push(`/${userInfo.role}/profile`);
    } else if (userInfo?.role === ENUMS_USER_ROLE.USER) {
      router.push(`/${userInfo.role}/profile`);
    }
  }, [router, userInfo?.role]);

  const submitHandler: SubmitHandler<FormValues> = (data: any) => {
    login(data);
  };

  return (
    <Form
      submitHandler={submitHandler}
      resolver={yupResolver(loginSchema)}
      isReset={isSuccess}
    >
      <div className="mb-3">
        <FormInput
          name="email"
          type="email"
          placeholder="example@gmail.com"
          label="Email"
        />
      </div>
      <div className="mb-3">
        <FormPasswordInput
          name="password"
          placeholder="••••••••"
          label="Password"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isLoading}
      >
        {isLoading ? "Loading" : " Sign in"}
      </button>
      {isError && <ErrorMessage errorMessage={(error as any).message} />}
      <p className="mt-3 text-sm font-light">
        Don’t have an account yet?
        <Link
          href="/register"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
