'use client';

import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { QueryProvider } from '@/providers/QueryProvider';
import { StoreProvider } from '@/providers/StoreProvider';
import { IconProvider } from '@/providers/IconProvider';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <IconProvider>
            <QueryProvider>
              <div className="min-h-screen">
                {pathname === '/auth/signin' ? (
                  children
                ) : (
                  <Navbar>{children}</Navbar>
                )}
              </div>
            </QueryProvider>
          </IconProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
