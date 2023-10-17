import axios from "axios";
import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/localStorage";
import { IGenericErrorResponse, IGenericResponse } from "@/types";

export const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.get["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  // @ts-ignore
  (response) => {
    const responseObj: IGenericResponse = {
      data: response?.data?.data,
      meta: response.data?.data?.meta,
    };

    return responseObj;
  },
  (error) => {
    const errorResponse: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      success: error?.response?.data?.success || false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!",
      errorMessages: error?.response?.data?.errorMessages || [],
    };

    return { error: errorResponse };
    // return Promise.reject(error);
  }
);
