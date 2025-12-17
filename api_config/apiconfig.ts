

import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiResponse<T> {
  error: boolean;
  data: T;
  statusCode: number;
}


export const customFetch = async <TResponse>({
  url,
  method = 'GET',
  body,
  headers = {},
}: {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}): Promise<ApiResponse<TResponse>> => {
  try {
    // Default headers
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      ...headers,
    };

    // Build axios config
    const axiosConfig: AxiosRequestConfig = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers: defaultHeaders,
      data: body,
    };

    // Make API call using axios
    const response = await axios(axiosConfig);

    // Return successful response
    return {
      error: false,
      data: response.data as TResponse,
      statusCode: response.status,
    };
  } catch (error) {
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        error: true,
        data: (axiosError.response?.data || null) as TResponse,
        statusCode: axiosError.response?.status || 0,
      };
    }

    // Handle other errors
    return {
      error: true,
      data: null as TResponse,
      statusCode: 0,
    };
  }
}


