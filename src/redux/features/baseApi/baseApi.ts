import axiosBaseQuery from "@/helpers/axios/axiosBaseQuery";
import getBaseUrl from "@/helpers/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tagTypes";

const baseAPi = createApi({
  reducerPath: "Book Store API",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});

export default baseAPi;
