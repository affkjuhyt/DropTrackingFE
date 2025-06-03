import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
  if (error.response?.status === 401) {
    try {
      const response = await apiClient.post('/auth/refresh');
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      
      if (error.config) {
        // Retry the original request with new token
        error.config.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(error.config);
      }
    } catch (refreshError) {
      localStorage.removeItem('token');
      window.location.href = '/auth/signin';
    }
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
