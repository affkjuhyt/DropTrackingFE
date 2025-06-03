import { render, screen, fireEvent } from '@/utils/test-utils';
import { AnimatedButton } from './AnimatedButton';

describe('AnimatedButton', () => {
  it('renders button with correct text', () => {
    render(<AnimatedButton>Click me</AnimatedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies correct size class based on size prop', () => {
    const { rerender } = render(<AnimatedButton size="sm">Small Button</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5');

    rerender(<AnimatedButton size="md">Medium Button</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2');

    rerender(<AnimatedButton size="lg">Large Button</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<AnimatedButton onClick={handleClick}>Click me</AnimatedButton>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays loading state correctly', () => {
    render(<AnimatedButton isLoading>Loading Button</AnimatedButton>);
    
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <AnimatedButton icon="user" iconPosition="left">
        User Profile
      </AnimatedButton>
    );
    
    const icon = screen.getByTestId('button-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('mr-2'); // Left position adds margin-right
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(
      <AnimatedButton variant="primary">Primary Button</AnimatedButton>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600');

    rerender(<AnimatedButton variant="secondary">Secondary Button</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-600');

    rerender(<AnimatedButton variant="outline">Outline Button</AnimatedButton>);
    expect(screen.getByRole('button')).toHaveClass('border-blue-600', 'text-blue-600');
  });

  it('applies disabled styles when disabled', () => {
    render(<AnimatedButton disabled>Disabled Button</AnimatedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });
});