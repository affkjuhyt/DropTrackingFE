import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from '@/providers/StoreProvider';
import { AuthProvider } from '@/providers/AuthProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withAuth?: boolean;
  withStore?: boolean;
  withQuery?: boolean;
}

function customRender(
  ui: React.ReactElement,
  {
    withAuth = true,
    withStore = true,
    withQuery = true,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    let wrapped = <>{children}</>;

    if (withQuery) {
      const queryClient = createTestQueryClient();
      wrapped = (
        <QueryClientProvider client={queryClient}>{wrapped}</QueryClientProvider>
      );
    }

    if (withAuth) {
      wrapped = <AuthProvider>{wrapped}</AuthProvider>;
    }

    if (withStore) {
      wrapped = <StoreProvider>{wrapped}</StoreProvider>;
    }

    return wrapped;
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Add common test utilities
export const createMockSession = (overrides = {}) => ({
  user: {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg',
    ...overrides,
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
});

export const createMockProduct = (overrides = {}) => ({
  id: 'test-product-id',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockOrder = (overrides = {}) => ({
  id: 'test-order-id',
  userId: 'test-user-id',
  status: 'pending',
  total: 99.99,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});