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
  }),
});

export const { useGetServicesQuery } = serviceAPi;