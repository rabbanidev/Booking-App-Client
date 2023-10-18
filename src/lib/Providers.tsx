"use client";

import { Provider } from "react-redux";
import store from "@/redux/app/store";
import { loggedIn } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/storageKey";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      store.dispatch(loggedIn(accessToken));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
