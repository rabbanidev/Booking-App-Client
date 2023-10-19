import { IMeta, IService } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";
import { IUsers } from "@/types/users";

const USERS_URL = "/users";

const usersApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => ({
        url: `${USERS_URL}/my-info`,
        method: "GET",
      }),
      transformResponse: (response: IUsers) => {
        return {
          user: response,
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-profile`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMyInfoQuery, useUpdateMyProfileMutation } = usersApi;
