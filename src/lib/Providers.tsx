"use client";

import { Provider } from "react-redux";
import store from "@/redux/app/store";
import { loggedIn } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.service";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const localData = getUserInfo();
    if (localData) {
      store.dispatch(loggedIn(localData));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
