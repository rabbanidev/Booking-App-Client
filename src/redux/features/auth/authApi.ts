import { storeUserInfo } from "@/services/auth.service";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";
import { loggedIn } from "./authSlice";

const AUTH_URL = "/auth";

const authApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(_undeifined, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          storeUserInfo({ accessToken: data.accessToken });

          dispatch(loggedIn(data.accessToken));
        } catch (error) {
          console.log("Login error", error);
        }
      },
      invalidatesTags: [tagTypes.user],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(_undeifined, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          storeUserInfo({ accessToken: data.accessToken });

          dispatch(loggedIn(data.accessToken));
        } catch (error) {
          console.log("Login error", error);
        }
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
