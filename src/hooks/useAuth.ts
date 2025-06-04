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
      document.cookie = `token=${access_token}; path=/; domain=${window.location.hostname}; SameSite=Strict; httpOnly=false`;
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
    const domain = window.location.hostname;
    document.cookie = `token=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; httpOnly=false`;
    window.location.href = '/auth/signin';
  };

  const getToken = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
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

