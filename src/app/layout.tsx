'use client';

import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { QueryProvider } from '@/providers/QueryProvider';
import { StoreProvider } from '@/providers/StoreProvider';
import { IconProvider } from '@/providers/IconProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { usePathname } from 'next/navigation';
import { NO_NAVBAR_ROUTES, type AuthRoutes } from '@/constants/routes';
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav';
import { Toaster } from "@/components/ui/shadcn/sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() as AuthRoutes;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <StoreProvider>
            <IconProvider>
              <QueryProvider>
                <div className="min-h-screen">
                  {NO_NAVBAR_ROUTES.includes(pathname) ? (
                    children
                  ) : (
                    <Navbar>
                      <div className="flex-1 p-8 pt-6">
                        {<BreadcrumbNav />}
                        {children}
                      </div>
                    </Navbar>
                  )}
                </div>
              </QueryProvider>
            </IconProvider>
          </StoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
