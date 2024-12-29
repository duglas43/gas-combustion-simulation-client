import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios";

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseQuery: "" }),
  endpoints: (builder) => ({}),
});
