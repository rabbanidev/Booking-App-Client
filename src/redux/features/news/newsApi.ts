import { IMeta, INews } from "@/types";
import baseAPi from "../baseApi/baseApi";
import { tagTypes } from "../tagTypes";

const NEWS_URL = "/news";

const newsApi = baseAPi.injectEndpoints({
  endpoints: (builder) => ({
    getNewses: builder.query({
      query: (arg) => ({
        url: `${NEWS_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: { data: INews[] }, meta: IMeta) => {
        return {
          newses: response?.data as INews[],
          meta,
        };
      },
      providesTags: [tagTypes.news],
    }),
    getNews: builder.query({
      query: (id) => ({
        url: `${NEWS_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: INews) => {
        return {
          news: response,
        };
      },
      providesTags: [tagTypes.news],
    }),
    createNews: builder.mutation({
      query: (data) => ({
        url: `${NEWS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.news],
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `${NEWS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.news],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `${NEWS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.news],
    }),
  }),
});

export const {
  useGetNewsesQuery,
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
