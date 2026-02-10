import { getAuthToken } from '@/lib/getAuthToken';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' ;
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
  params,
}: {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}): Promise<ApiResponse<TResponse>> => {


  const token = await getAuthToken();
  try {
    // Default headers
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'Authorization': `Bearer ${token}`,
      ...headers,
    };


    // Build axios config
    const cleanBaseUrl = API_BASE_URL?.replace(/\/+$/, '') || '';
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const finalUrl = `${cleanBaseUrl}${cleanUrl}`;

    // Debug log to verify URL in production logs
    if (process.env.NODE_ENV === 'production') {
        console.log(`[API Request] ${method} ${finalUrl}`);
    }
    
    const axiosConfig: AxiosRequestConfig = {
      method,
      url: finalUrl,
      headers: defaultHeaders,
      data: body,
      params: params,
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


