# Testing Guidelines

## Overview
This project uses Jest and React Testing Library for testing. The testing setup is designed to provide a robust testing environment with proper mocking of Next.js features and common dependencies.

## Test Structure

```
src/
  └── components/
      └── ComponentName/
          ├── ComponentName.tsx
          ├── ComponentName.test.tsx
          └── __tests__/        # For complex components with multiple test files
              ├── integration.test.tsx
              └── unit.test.tsx
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests in CI environment
npm run test:ci
```

## Testing Utilities

### Custom Render Function
Use the custom render function from `@/utils/test-utils` which provides common providers:

```typescript
import { render, screen } from '@/utils/test-utils';

test('your test', () => {
  render(<YourComponent />, {
    withAuth: true,    // Include AuthProvider
    withStore: true,   // Include StoreProvider
    withQuery: true,   // Include QueryClientProvider
  });
});
```

### Mock Data Factories
Use the provided mock factories for consistent test data:

```typescript
import { createMockSession, createMockProduct, createMockOrder } from '@/utils/test-utils';

const session = createMockSession({ name: 'Custom Name' });
const product = createMockProduct({ price: 199.99 });
const order = createMockOrder({ status: 'completed' });
```

## Best Practices

### 1. Component Testing
- Test component rendering
- Test user interactions
- Test different prop combinations
- Test error states
- Test loading states
- Test accessibility

```typescript
describe('Component', () => {
  it('renders correctly', () => {});
  it('handles user interactions', () => {});
  it('displays error state', () => {});
  it('shows loading state', () => {});
  it('is accessible', () => {});
});
```

### 2. Hook Testing
- Test hook initialization
- Test state updates
- Test side effects
- Mock external dependencies

```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCustomHook', () => {
  it('initializes with default values', () => {});
  it('updates state correctly', () => {});
  it('handles side effects', () => {});
});
```

### 3. API Testing
- Mock API responses
- Test success and error cases
- Test loading states

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/endpoint', (req, res, ctx) => {
    return res(ctx.json({ data: 'mocked' }));
  })
);
```

### 4. Store Testing
- Test reducers
- Test selectors
- Test async actions

```typescript
describe('store', () => {
  it('updates state correctly', () => {});
  it('handles async actions', () => {});
  it('selects correct state', () => {});
});
```

## Coverage Requirements
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Common Patterns

### 1. Testing Async Operations
```typescript
it('loads data asynchronously', async () => {
  render(<AsyncComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await screen.findByText('Data loaded');
});
```

### 2. Testing Form Submissions
```typescript
it('handles form submission', async () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.click(screen.getByText('Submit'));
  
  expect(onSubmit).toHaveBeenCalled();
});
```

### 3. Testing Error Boundaries
```typescript
it('catches and displays errors', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation();
  render(
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <ComponentThatThrows />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
  spy.mockRestore();
});
```

## Debugging Tests

### 1. Debug Output
```typescript
screen.debug(); // Print the current DOM state
```

### 2. Manual Queries
```typescript
// When automatic queries don't work
screen.getByRole('button', { name: /submit/i });
screen.getByTestId('custom-element');
```

### 3. Testing Library DevTools
Install the Testing Library DevTools browser extension for better debugging capabilities.

## Continuous Integration
Tests are automatically run in the CI pipeline using `npm run test:ci`. This command:
- Runs tests with coverage reporting
- Uses fewer workers to avoid memory issues
- Fails if coverage thresholds are not met

## Additional Resources
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Jest DOM Custom Matchers](https://github.com/testing-library/jest-dom)