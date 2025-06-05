import apiClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { getToken } from "@/lib/utils";
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const useAuth = () => {
  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/login', credentials);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      return response.data;
    }
  });

  const registerMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/register', credentials);
      return response.data;
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth/signin';
  };

  const isAuthenticated = typeof window !== 'undefined' ? !!getToken() : false;

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isPending: loginMutation.isPending || registerMutation.isPending,
    isAuthenticated
  };
};

