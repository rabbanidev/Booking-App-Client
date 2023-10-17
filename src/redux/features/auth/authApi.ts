import baseAPi from "../baseApi/baseApi";
import { storeUserInfo } from "@/services/auth.service";

const authApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      async onQueryStarted(_undeifined, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          storeUserInfo(data.accessToken);
        } catch (error) {
          console.log("Login error", error);
        }
      },
      // invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
