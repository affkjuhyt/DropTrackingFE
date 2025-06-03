import { useSession, signIn, signOut } from "next-auth/react";
import apiClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

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

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isPending: loginMutation.isPending || registerMutation.isPending
  };
};

