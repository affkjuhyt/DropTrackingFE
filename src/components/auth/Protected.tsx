"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function Protected({ children }: { children: React.ReactNode }) {
  console.log('=== Protected Component ===');
  const { isAuthenticated, isPending } = useAuth();
  const router = useRouter();
  
  console.log('Auth state:', { isAuthenticated, isPending });
  
  if (isPending) {
    console.log('Auth is pending, showing loading...');
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to signin...');
    router.push("/auth/signin");
    return null;
  }
  
  console.log('Authenticated, rendering children...');
  return <>{children}</>;
}