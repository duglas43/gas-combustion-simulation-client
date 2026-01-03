import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface AxiosErrorData {
  statusCode: number;
  message: string;
}
export const axiosBaseQuery =
  ({
    baseQuery,
  }: {
    baseQuery: string;
  }): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params, ...other }) => {
    try {
      const result = await axiosInstance({
        url: baseQuery + url,
        method: method || "GET",
        data: body,
        params,
        ...other,
      });
      return { ...result, meta: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError<{
        message: string;
        messageT?: string;
        errors: string[];
      }>;
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message,
          messageT: err.response?.data?.messageT,
          errors: err.response?.data?.errors,
        },
      };
    }
  };
