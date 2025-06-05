import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  console.log('[Axios] Processing request config:', config.url);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[Axios] Added Authorization header with token');
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.log('=== API Error Response ===');
  console.log("error: ", error);
  console.log('Error status:', error.response?.status);
  console.log('Error URL:', error.config?.url);
  
  if (error.response?.status === 401) {
    // console.log('Detected 401 error, attempting to refresh token...');
    // try {
    //   const response = await apiClient.post('/auth/refresh');
    //   const { access_token } = response.data;
    //   console.log('Token refresh successful');
      
    //   if (error.config) {
    //     console.log('Retrying original request with new token...');
    //     // Retry the original request with new token
    //     error.config.headers.Authorization = `Bearer ${access_token}`;
    //     return apiClient(error.config);
    //   }
    // } catch (refreshError) {
    //   console.log('Token refresh failed:', refreshError);
    //   console.log('Redirecting to signin page...');
    //   window.location.href = '/auth/signin';
    // }
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use(onRequest, onRequestError);
apiClient.interceptors.response.use(onResponse, onResponseError);

export default apiClient;

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
};
