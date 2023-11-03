import { IUsers } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const USERS_URL = "/users";

const usersApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => ({
        url: `/${USERS_URL}/my-info`,
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
        url: `/${USERS_URL}/update-profile`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updateUserByAuthority: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${USERS_URL}/update-user-info/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    enableUserByAuthority: builder.mutation({
      query: (id) => ({
        url: `/${USERS_URL}/enable-user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getAllNormalUsers: builder.query({
      query: () => ({
        url: `/${USERS_URL}/normal-users`,
        method: "GET",
      }),
      transformResponse: (response: IUsers[]) => {
        return {
          users: response,
        };
      },
      providesTags: [tagTypes.user],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/${USERS_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IUsers) => {
        return {
          user: response,
        };
      },
      providesTags: [tagTypes.user],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/${USERS_URL}`,
        method: "GET",
      }),
      transformResponse: (response: IUsers[]) => {
        return {
          users: response,
        };
      },
      providesTags: [tagTypes.user],
    }),

    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/${USERS_URL}/create-admin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetMyInfoQuery,
  useUpdateMyProfileMutation,
  useGetAllNormalUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserByAuthorityMutation,
  useEnableUserByAuthorityMutation,
  useGetAllUsersQuery,
  useCreateAdminMutation,
} = usersApi;
