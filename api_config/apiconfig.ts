import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAuthToken } from "@/lib/getAuthToken";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiResponse<T> {
  error: boolean;
  data: T;
  statusCode: number;
}

export const customFetch = async <T>({
  url,
  method = "GET",
  body,
  params,
  headers = {},
}: {
  url: string;
  method?: HttpMethod;
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}): Promise<ApiResponse<T>> => {
  try {
    const token = await getAuthToken();

    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };

    // ✅ ONLY attach token if it exists
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers: finalHeaders,
      data: body,
      params,
    };

    const response = await axios(config);

    return {
      error: false,
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;

    return {
      error: true,
      data: (err.response?.data || null) as T,
      statusCode: err.response?.status || 500,
    };
  }
};