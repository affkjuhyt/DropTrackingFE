import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { QueryProvider } from '@/providers/QueryProvider';
import { StoreProvider } from '@/providers/StoreProvider';
import { IconProvider } from '@/providers/IconProvider';

export const metadata = {
  title: 'Dropship Tracker',
  description: 'Track and manage your dropshipping business efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <StoreProvider>
          <IconProvider>
            <QueryProvider>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  {children}
                </main>
              </div>
            </QueryProvider>
          </IconProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
