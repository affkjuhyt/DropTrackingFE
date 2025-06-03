"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    redirect("/auth/signin");
  }
  
  return <>{children}</>;
}