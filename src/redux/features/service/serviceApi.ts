import { IMeta, IService } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const SERVICE_URL = "/services";

const serviceAPi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (arg) => ({
        url: `${SERVICE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: { data: IService[] }, meta: IMeta) => {
        return {
          services: response?.data as IService[],
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),
    getService: builder.query({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IService) => {
        return {
          service: response,
        };
      },
      providesTags: [tagTypes.service],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceAPi;
