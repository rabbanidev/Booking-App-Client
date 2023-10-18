"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/app/hooks";
import { authLoggedIn } from "@/services/auth.service";
import { redirect } from "next/navigation";

const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const { accessToken } = useAppSelector((state) => state.auth);
    const isUserLoggedIn = accessToken && authLoggedIn(accessToken);

    useEffect(() => {
      if (!isUserLoggedIn) {
        redirect("/login");
      }
    }, [isUserLoggedIn]);

    return <Component {...props} />;
  };
};

export default withAuth;
