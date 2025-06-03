import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'));

// Mock next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Configure global fetch mock
global.fetch = jest.fn();

// Add custom matchers or global test configuration here
expect.extend({
  // Add custom matchers if needed
});